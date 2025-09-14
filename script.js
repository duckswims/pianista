const BASE = "https://planner-apim.azure-api.net"; // Base URL
const API_KEY = "YOUR_API_HERE";

const endpointSelect = document.getElementById("endpoint");
const endpointParams = document.getElementById("endpointParams");

// Configuration: list of available requests
const endpointsConfig = [
    {
        name: "Root",
        endpoint: "",
        method: "GET",
        params: null
    },
    {
        name: "Get Planner(s)",
        endpoint: "planners",
        method: "GET",
        params: [
            { name: "planner_id", type: "string"}
        ]
    },
    {
        name: "Get Solver(s)",
        endpoint: "solvers",
        method: "GET",
        params: [
            { name: "solver_id", type: "string"}
        ]
    },
    {
        name: "Get Plan",
        endpoint: "solve/pddl",
        method: "GET",
        params: [
            { name: "id", useQueryParam: true, required: true, type: "string"}
        ]
    },
    {
        name: "Get Solution",
        endpoint: "solve/minizinc",
        method: "GET",
        params: [
            { name: "id", useQueryParam: true, required: true, type: "string"}
        ]
    },
    {
        name: "Post Solve",
        endpoint: "solve/minizinc",
        method: "POST",
        params: [
            { name: "solver_name", useQueryParam: true, required: false, type: "string"},
        ],
        requestBody: {
            placeholder: {
                "model_str": "string",
                "model_params": {}
            },
            default: {
                "model_str": "int: target;\\nvar 0..100: x;\\nvar 0..100: y;\\n\\nconstraint x + y == target;\\n\\nsolve satisfy;",
                "model_params": {
                    "target": 199
                }
            }
        },
    },
    {
        name: "Post Plan",
        endpoint: "solve/pddl",
        method: "POST",
        params: [
            { name: "planner_id", useQueryParam: true, required: false},
            { name: "convert_real_types", useQueryParam: true, required: false, type: "boolean"},
        ],
        requestBody: {
            placeholder: {
                "domain": "string",
                "problem": "string"
            },
            default: {
                "domain": "(define (domain simple_switch)\n   (:requirements :typing)\n   (:types switch)\n   (:predicates (off ?s - switch)\n        (on ?s - switch))\n\n   (:action switchon\n       :parameters (?s - switch)\n       :precondition (and (off ?s))\n       :effect (and  (not (off ?s))\n            (on ?s)))\n   (:action switchoff\n       :parameters (?s - switch)\n       :precondition (and (on ?s))\n       :effect (and (not (on ?s)) (off ?s))))",
                "problem": "(define (problem problem0)\n   (:domain simple_switch)\n   (:objects\n        switch1 - switch\n        switch2 - switch\n    )\n   (:init (on switch1)\n          (off switch2))\n   (:goal (and\n          (on switch1)\n          (on switch2))))\n"
            }
        },
    },
];


// Dynamically populate the select dropdown
endpointsConfig.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.name;
    option.endpoint = opt.endpoint;
    option.textContent = opt.name;
    option.dataset.method = opt.method; 
    endpointSelect.appendChild(option);
});






endpointSelect.addEventListener("change", () => {
    const selected = endpointsConfig.find(e => e.name === endpointSelect.value);

    // Clear previous inputs
    endpointParams.innerHTML = "";

    if (selected && selected.params && selected.params.length > 0) {
        endpointParams.style.display = "flex";

        selected.params.forEach((param, index) => {
            // Create label
            const label = document.createElement("label");
            label.className = "col-sm-2 col-form-label";
            label.htmlFor = `param_${index}`;
            label.innerHTML = param.required ? `${param.name}: <span style="color:red">*</span>` : `${param.name}:`;

            // Create input
            const input = document.createElement("input");
            input.type = "text";
            input.id = `param_${index}`;
            input.name = param.name;
            input.placeholder = `Enter a ${param.type || "value"}`;
            input.className = "form-control";
            input.required = !!param.required;

            // Append to container (no nested div)
            endpointParams.appendChild(label);
            endpointParams.appendChild(input);
        });

    } else {
        endpointParams.style.display = "none";
    }

    // Show/hide POST request body
    const requestField = document.getElementById("requestField");
    const requestBody = document.getElementById("requestBody");

    if (selected && selected.method === "POST") {
        requestField.style.display = "block";
        if (selected.requestBody && selected.requestBody.default) {
            requestBody.value = JSON.stringify(selected.requestBody.default, null, 4);
        }
    } else {
        requestField.style.display = "none";
        requestBody.value = "";
    }
});



document.getElementById("apiForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectedConfig = endpointsConfig.find(e => e.name === endpointSelect.value);
    if (!selectedConfig) return;

    let url = BASE;
    if (selectedConfig.endpoint) {
        url += `/${selectedConfig.endpoint}`;
    }

    // Handle dynamic parameters
    if (selectedConfig.params && selectedConfig.params.length > 0) {
        selectedConfig.params.forEach(param => {
            const input = document.querySelector(`#endpointParams input[name="${param.name}"]`);
            const val = input ? input.value.trim() : "";

            if (!val) return; // skip empty

            // Type validation
            if (param.type) {
                let isValid = true;
                switch (param.type) {
                    case "string":
                        // all values are valid as string
                        break;
                    case "number":
                        if (isNaN(Number(val))) isValid = false;
                        break;
                    case "boolean":
                        if (!["true", "false"].includes(val.toLowerCase())) isValid = false;
                        break;
                    case "object":
                        try {
                            const parsed = JSON.parse(val);
                            if (typeof parsed !== "object" || Array.isArray(parsed)) isValid = false;
                        } catch (err) {
                            isValid = false;
                        }
                        break;
                    default:
                        console.warn(`Unknown type ${param.type} for param ${param.name}`);
                }

                if (!isValid) {
                    alert(`Invalid value for ${param.name}. Expected type: ${param.type}`);
                    throw new Error(`Invalid value for ${param.name}`);
                }
            }

            // Append to URL
            if (param.useQueryParam) {
                url += `?${encodeURIComponent(param.name)}=${encodeURIComponent(val)}`;
            } else {
                url += `/${encodeURIComponent(val)}`;
            }
        });
    }

    let options = {
        method: selectedConfig.method,
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY
        }
    };

    // Handle POST body if present
    if (selectedConfig.method === "POST") {
        const requestBody = document.getElementById("requestBody").value;
        if (requestBody) {
            options.headers["Content-Type"] = "application/json";
            try {
                options.body = JSON.stringify(JSON.parse(requestBody));
            } catch (err) {
                alert("Invalid JSON in request body");
                return;
            }
        }
    }

    callApi(url, options);
});



async function callApi(url, options = { method: "GET", headers: {} }) {
    const responseContainer = document.querySelector(".response");
    const responseMsg = document.getElementById("responseMsg")

    // Show the response section
    responseContainer.style.display = "block";

    try {
        const response = await fetch(url, options);

        let data;
        try {
            data = await response.json();
        } catch {
            data = await response.text();
        }

        const message = response.ok ? "✅ Success" : `❌ Error ${response.status}`;

        // Helper to clean up whitespace and newlines in a string
        function cleanMessage(msg) {
            if (typeof msg !== "string") return msg; // if not string, return as-is
            return msg
                .split("\n")               // split by newlines
                .map(line => line.trim())  // trim each line
                .join(" ")                 // join lines with a space
                .replace(/\s+/g, " ");    // collapse multiple spaces into one
        }

        // Format data for display
        function formatData(obj) {
            let result = "";

            if (Array.isArray(obj)) {
                // Handle arrays
                obj.forEach((item, index) => {
                    result += `[${index}]\n`;
                    if (typeof item === "object" && item !== null) {
                        for (const [key, value] of Object.entries(item)) {
                            result += `${key}: ${cleanMessage(value)}\n`;
                        }
                    } else {
                        result += `${cleanMessage(item)}\n`;
                    }
                    result += "\n"; // space between items
                });
            } else if (typeof obj === "object" && obj !== null) {
                // Handle objects
                for (const [key, value] of Object.entries(obj)) {
                    result += `${key}: ${cleanMessage(value)}\n`;
                }
            } else {
                // Primitive
                result += `${cleanMessage(obj)}\n`;
            }

            return result.trim(); // remove trailing newline
        }

        const formattedData = typeof data === "object" ? formatData(data) : data;

        responseMsg.textContent = `URL: ${url}\n\nStatus: ${message}\n\n${formattedData}`;

    } catch (error) {
        responseMsg.textContent = `❌ Fetch failed \nURL: ${url}\n\n${error.message}`;
    }
}
