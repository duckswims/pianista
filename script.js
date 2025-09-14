const BASE = "https://planner-apim.azure-api.net"; // Base URL
const API_KEY = "YOUR_API_HERE";

const endpointSelect = document.getElementById("endpoint");
const endpointParams = document.getElementById("endpointParams");
// const endpointLabel = document.querySelector("#endpointParams label");
// const endpointInput = document.getElementById("endpointId");
const bodyField = document.getElementById("bodyField");
const bodyInput = document.getElementById("endpointBody");

// Configuration: list of available requests
const endpointsConfig = [
    { name: "Root", endpoint: "", params: null, useQueryParam: false, method: "GET" },
    { name: "Get Planner(s)", endpoint: "planners", params: ["planner_id"], useQueryParam: false, method: "GET" },
    { name: "Get Solver(s)", endpoint: "solvers", params: ["solver_id"], useQueryParam: false, method: "GET" },
    { name: "Get Plan", endpoint: "solve/pddl", params: ["id"], useQueryParam: true, method: "GET", required: true },
    { name: "Get Solution", endpoint: "solve/minizinc", params: ["id"], useQueryParam: true, method: "GET", required: true },

    // {
    //     name: "Post Solve",
    //     value: "solve/minizinc",
    //     endpointParams: "solver_name",   // optional query param
    //     useQueryParam: true,      // append as ?solver_name=...
    //     method: "POST",
    //     bodyTemplate: {
    //         "model_str": "string",
    //         "model_params": {}
    //     }
    // }
];


// Dynamically populate the select dropdown
endpointsConfig.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.endpoint;
    option.textContent = opt.name;
    option.dataset.method = opt.method; 
    endpointSelect.appendChild(option);
});






endpointSelect.addEventListener("change", () => {
    const selected = endpointsConfig.find(e => e.endpoint === endpointSelect.value);

    // Clear previous inputs
    endpointParams.innerHTML = "";

    // const paramNote = document.getElementById("paramNote");
    // paramNote.innerHTML = "";

    if (selected && selected.params && selected.params.length > 0) {
        endpointParams.style.display = "flex";

        selected.params.forEach((param, index) => {
            // Create label
            const label = document.createElement("label");
            label.className = "col-sm-2 col-form-label";
            label.htmlFor = `param_${index}`;
            label.innerHTML = selected.required ? `${param}: <span style="color:red">*</span>` : `${param}:`;

            // Create input
            const input = document.createElement("input");
            input.type = "text";
            input.id = `param_${index}`;
            input.name = param;
            input.placeholder = `e.g. ${param}123`;
            input.className = "form-control";
            input.required = !!selected.required;

            // Append to container (no nested div)
            endpointParams.appendChild(label);
            endpointParams.appendChild(input);
        });

        // // Add standard "* required" note if needed
        // if (selected.required) {
        //     const note = document.createElement("p");
        //     note.style.color = "red";
        //     note.style.fontSize = "0.9em";
        //     note.textContent = "required*";
        //     paramNote.appendChild(note);
        // }

    } else {
        endpointParams.style.display = "none";
    }

    // Show/hide body input for POST
    if (selected && selected.method === "POST") {
        bodyField.classList.remove("d-none");
        if (selected.bodyTemplate) {
            bodyInput.value = JSON.stringify(selected.bodyTemplate, null, 2);
        }
    } else {
        bodyField.classList.add("d-none");
        bodyInput.value = "";
    }
});



document.getElementById("apiForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Look up the selected config using the new "endpoint" property
    const selectedConfig = endpointsConfig.find(e => e.endpoint === endpointSelect.value);
    if (!selectedConfig) return;

    const endpoint = selectedConfig.endpoint.toLowerCase();
    const method = selectedConfig.method || "GET";

    let url = BASE;
    if (endpoint) {
        url += `/${endpoint}`;
    }

    // Handle dynamic parameters
    if (selectedConfig.params && selectedConfig.params.length > 0) {
        const paramValues = selectedConfig.params.map(param => {
            const input = document.querySelector(`#endpointParams input[name="${param}"]`);
            return input ? input.value.trim() : "";
        });

        // For GET requests with query parameter
        if (selectedConfig.useQueryParam) {
            const query = selectedConfig.params
                .map((param, i) => `${encodeURIComponent(param)}=${encodeURIComponent(paramValues[i])}`)
                .join("&");
            if (query) url += `?${query}`;
        } else {
            // Append as path segments
            paramValues.forEach(val => {
                if (val) url += `/${encodeURIComponent(val)}`;
            });
        }
    }

    let options = {
        method,
        headers: {
            "Ocp-Apim-Subscription-Key": API_KEY
        }
    };

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
