// src/scripts/api/chat.js
import { postGeneratePddl, postConvertPddlToMermaid } from "./convert";
import { postValidatePddl, postValidatePddlMatch, validateProblemPlan } from "./validate";
import { postPlan, getPlan } from "./pddl";

// Push a message immediately if callback is provided
function pushMessage(push, text, sender = "bot") {
  if (typeof push === "function") {
    push({ sender, text });
  }
}

/**
 * Filter plan to remove the planner name
 */
function filterPlan(plan) {
  if (!plan) return "";
  const idx = plan.indexOf("SequentialPlan:");
  return idx >= 0 ? plan.slice(idx) : plan;
}

/**
 * Helper: Generate PDDL (domain + problem)
 */
async function generatePddl(text, push) {
  try {
    const genRes = await postGeneratePddl("problem", { text, domain: "" }, true);

    if (genRes?.result_status !== "success") {
      pushMessage(push, `❌ PDDL generation failed: ${genRes?.message || JSON.stringify(genRes)}`);
      return {};
    }

    pushMessage(push, "✅ Domain and Problem generated.");
    return {
      generated_domain: genRes.generated_domain,
      generated_problem: genRes.generated_problem,
    };
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error generating PDDL: ${err.message || err}`);
    return {};
  }
}

/**
 * Helper: Validate PDDL (domain or problem)
 * Stops execution if validation fails
 */
async function validatePddl(pddl, type, push) {
  try {
    const validationRes = await postValidatePddl({ pddl }, type);
    if (validationRes?.result === "success") {
      pushMessage(push, `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} validated successfully: ${validationRes.message || ""}`);
      return true;
    } else {
      pushMessage(push, `❌ ${type.charAt(0).toUpperCase() + type.slice(1)} validation failed: ${validationRes?.message || "Unknown error"}`);
      return false;
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error validating ${type}: ${err.message || err}`);
    return false;
  }
}

/**
 * Helper: Validate domain/problem match
 */
async function validatePddlMatch(domain, problem, push) {
  try {
    const matchRes = await postValidatePddlMatch({ domain, problem });
    if (matchRes?.result === "success") {
      pushMessage(push, `✅ Domain & Problem match validated: ${matchRes.message || ""}`);
      return true;
    } else {
      pushMessage(push, `❌ Domain & Problem match validation failed: ${matchRes?.message || "Unknown error"}`);
      return false;
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error validating domain/problem match: ${err.message || err}`);
    return false;
  }
}

/**
 * Helper: Validate plan against domain/problem
 */
async function validatePlan(domain, problem, plan, push) {
  try {
    const filteredPlan = filterPlan(plan);
    const validationRes = await validateProblemPlan({ domain, problem, plan: filteredPlan });
    if (validationRes?.result === "success") {
      pushMessage(push, `✅ Plan validated: ${validationRes.message || ""}`);
      return true;
    } else {
      pushMessage(push, `❌ Plan validation failed: ${validationRes?.message || "Unknown error"}`);
      return false;
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error validating plan: ${err.message || err}`);
    return false;
  }
}

/**
 * Helper: Post a planning request and poll for completion
 */
async function postAndPollPlan(domain, problem, planner_id, push) {
  try {
    const planRes = await postPlan({ domain, problem }, planner_id);
    if (!planRes?.id) {
      pushMessage(push, `❌ Failed to create plan: ${JSON.stringify(planRes)}`);
      return null;
    }

    const jobId = planRes.id;
    pushMessage(push, `⏳ Job created: ${jobId}. Waiting for plan...`);

    const startTime = Date.now();
    const TIMEOUT = 30000;
    const INTERVAL = 5000;

    while (Date.now() - startTime < TIMEOUT) {
      const planStatus = await getPlan(jobId);

      if (planStatus.plan) {
        const filtered = filterPlan(planStatus.plan);
        pushMessage(push, `✅ Plan ready:\n${filtered}`);
        return filtered;
      }

      if (planStatus.detail && planStatus.detail.includes("not yet ready")) {
        await new Promise((r) => setTimeout(r, INTERVAL));
        continue;
      }

      pushMessage(push, `⚠️ Unexpected plan response: ${JSON.stringify(planStatus)}`);
      return null;
    }

    pushMessage(push, `❌ Plan timeout: job ${jobId} did not finish within ${TIMEOUT / 1000}s.`);
    return null;
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error during plan execution: ${err.message || err}`);
    return null;
  }
}

/**
 * Convert any PDDL text to Mermaid
 */
async function convertPddlToMermaid(pddl, type, push) {
  try {
    const res = await postConvertPddlToMermaid({ pddl }, type);
    if (res?.result_status === "success") {
      pushMessage(push, `✅ ${type} converted to Mermaid successfully.`);
      pushMessage(push, `📊 Mermaid ${type}:\n${res.conversion_result}`);
      return true;
    } else {
      pushMessage(push, `❌ Failed to convert ${type} to Mermaid: ${res?.message || "Unknown error"}`);
      return false;
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error converting ${type} to Mermaid: ${err.message || err}`);
    return false;
  }
}

/**
 * Main function: generate, validate, plan, convert
 */
export async function generateAndValidatePddl(text, planner_id, push) {
  // 1️⃣ Generate domain & problem
  const { generated_domain, generated_problem } = await generatePddl(text, push);
  if (!generated_domain || !generated_problem) return;

  // 2️⃣ Validate domain
  if (!(await validatePddl(generated_domain, "domain", push))) return;

  // 3️⃣ Validate problem
  if (!(await validatePddl(generated_problem, "problem", push))) return;

  // 4️⃣ Validate domain/problem match
  if (!(await validatePddlMatch(generated_domain, generated_problem, push))) return;

  // 5️⃣ Post plan & poll
  const plan = await postAndPollPlan(generated_domain, generated_problem, planner_id, push);
  if (!plan) return;

  // 6️⃣ Validate plan
  if (!(await validatePlan(generated_domain, generated_problem, plan, push))) return;

  // 7️⃣ Convert domain, problem, plan → Mermaid
  await convertPddlToMermaid(generated_domain, "domain", push);
  await convertPddlToMermaid(generated_problem, "problem", push);
  await convertPddlToMermaid(plan, "plan", push);
}
