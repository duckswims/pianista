// src/scripts/api/chat.js
import { postGeneratePddl } from "./convert";
import { postValidatePddl, postValidatePddlMatch } from "./validate";
import { postPlan, getPlan } from "./pddl";

/**
 * Helper: Generate PDDL (domain + problem)
 */
async function generatePddl(text) {
  try {
    const genRes = await postGeneratePddl("problem", { text, domain: "" }, true);

    if (genRes?.result_status !== "success") {
      return { messages: [{ sender: "bot", text: `❌ PDDL generation failed: ${genRes?.message || JSON.stringify(genRes)}` }] };
    }

    return {
      generated_domain: genRes.generated_domain,
      generated_problem: genRes.generated_problem,
      messages: [{ sender: "bot", text: "✅ Domain and Problem generated." }]
    };
  } catch (err) {
    console.error(err);
    return { messages: [{ sender: "bot", text: `❌ Error generating PDDL: ${err.message || err}` }] };
  }
}

/**
 * Helper: Validate PDDL (domain or problem)
 */
async function validatePddl(pddl, type) {
  try {
    const validationRes = await postValidatePddl({ pddl }, type);
    if (validationRes?.result === "success") {
      return { sender: "bot", text: `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} validated successfully: ${validationRes.message || ""}` };
    } else {
      return { sender: "bot", text: `⚠️ ${type.charAt(0).toUpperCase() + type.slice(1)} validation failed: ${validationRes?.message || "Unknown error"}` };
    }
  } catch (err) {
    console.error(err);
    return { sender: "bot", text: `❌ Error validating ${type}: ${err.message || err}` };
  }
}

/**
 * Helper: Validate domain/problem match
 */
async function validatePddlMatch(domain, problem) {
  try {
    const matchRes = await postValidatePddlMatch({ domain, problem });
    if (matchRes?.result === "success") {
      return { sender: "bot", text: `✅ Domain & Problem match validated: ${matchRes.message || ""}` };
    } else {
      return { sender: "bot", text: `⚠️ Domain & Problem match validation failed: ${matchRes?.message || "Unknown error"}` };
    }
  } catch (err) {
    console.error(err);
    return { sender: "bot", text: `❌ Error validating domain/problem match: ${err.message || err}` };
  }
}

/**
 * Helper: Post a planning request and poll for completion
 */
async function postAndPollPlan(domain, problem, planner_id) {
  const messages = [];

  try {
    // Post the plan
    const planRes = await postPlan({ domain, problem }, planner_id);
    if (!planRes?.id) {
      messages.push({ sender: "bot", text: `❌ Failed to create plan: ${JSON.stringify(planRes)}` });
      return messages;
    }

    const jobId = planRes.id;
    messages.push({ sender: "bot", text: `⏳ Job created: ${jobId}. Waiting for plan...` });

    // Polling
    const startTime = Date.now();
    const TIMEOUT = 30000; // 30s
    const INTERVAL = 5000; // 5s

    while (Date.now() - startTime < TIMEOUT) {
      const planStatus = await getPlan(jobId);

      if (planStatus.plan) {
        messages.push({ sender: "bot", text: `✅ Plan ready:\n${planStatus.plan}` });
        return messages;
      }

      if (planStatus.detail && planStatus.detail.includes("not yet ready")) {
        await new Promise((r) => setTimeout(r, INTERVAL));
        continue;
      }

      // Any unexpected response
      messages.push({ sender: "bot", text: `⚠️ Unexpected plan response: ${JSON.stringify(planStatus)}` });
      return messages;
    }

    messages.push({ sender: "bot", text: `❌ Plan timeout: job ${jobId} did not finish within ${TIMEOUT/1000}s.` });
  } catch (err) {
    console.error(err);
    messages.push({ sender: "bot", text: `❌ Error during plan execution: ${err.message || err}` });
  }

  return messages;
}

/**
 * Main function: generate, validate, plan
 */
export async function generateAndValidatePddl(text, planner_id) {
  const messages = [];

  // 1️⃣ Generate domain & problem
  const { generated_domain, generated_problem, messages: genMessages } = await generatePddl(text);
  messages.push(...(genMessages || []));

  if (!generated_domain || !generated_problem) return messages;

  // 2️⃣ Validate domain
  messages.push(await validatePddl(generated_domain, "domain"));

  // 3️⃣ Validate problem
  messages.push(await validatePddl(generated_problem, "problem"));

  // 4️⃣ Validate domain/problem match
  messages.push(await validatePddlMatch(generated_domain, generated_problem));

  // 5️⃣ Post plan & poll
  messages.push(...await postAndPollPlan(generated_domain, generated_problem, planner_id));

  return messages;
}