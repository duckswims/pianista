// src/scripts/api/chat.js
import { postGeneratePddl } from "./convert";
import { postValidatePddl, postValidatePddlMatch } from "./validate";
import { postPlan, getPlan } from "./pddl";

// Push a message immediately if callback is provided
function pushMessage(push, text, sender = "bot") {
  if (typeof push === "function") {
    push({ sender, text });
  }
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

// Similarly, everywhere else:
async function validatePddl(pddl, type, push) {
  try {
    const validationRes = await postValidatePddl({ pddl }, type);
    if (validationRes?.result === "success") {
      pushMessage(push, `✅ ${type.charAt(0).toUpperCase() + type.slice(1)} validated successfully: ${validationRes.message || ""}`);
    } else {
      pushMessage(push, `⚠️ ${type.charAt(0).toUpperCase() + type.slice(1)} validation failed: ${validationRes?.message || "Unknown error"}`);
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error validating ${type}: ${err.message || err}`);
  }
}

async function validatePddlMatch(domain, problem, push) {
  try {
    const matchRes = await postValidatePddlMatch({ domain, problem });
    if (matchRes?.result === "success") {
      pushMessage(push, `✅ Domain & Problem match validated: ${matchRes.message || ""}`);
    } else {
      pushMessage(push, `⚠️ Domain & Problem match validation failed: ${matchRes?.message || "Unknown error"}`);
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error validating domain/problem match: ${err.message || err}`);
  }
}

async function postAndPollPlan(domain, problem, planner_id, push) {
  try {
    const planRes = await postPlan({ domain, problem }, planner_id);
    if (!planRes?.id) {
      pushMessage(push, `❌ Failed to create plan: ${JSON.stringify(planRes)}`);
      return;
    }

    const jobId = planRes.id;
    pushMessage(push, `⏳ Job created: ${jobId}. Waiting for plan...`);

    const startTime = Date.now();
    const TIMEOUT = 30000;
    const INTERVAL = 5000;

    while (Date.now() - startTime < TIMEOUT) {
      const planStatus = await getPlan(jobId);

      if (planStatus.plan) {
        pushMessage(push, `✅ Plan ready:\n${planStatus.plan}`);
        return;
      }

      if (planStatus.detail && planStatus.detail.includes("not yet ready")) {
        await new Promise((r) => setTimeout(r, INTERVAL));
        continue;
      }

      pushMessage(push, `⚠️ Unexpected plan response: ${JSON.stringify(planStatus)}`);
      return;
    }

    pushMessage(push, `❌ Plan timeout: job ${jobId} did not finish within ${TIMEOUT/1000}s.`);
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error during plan execution: ${err.message || err}`);
  }
}


/**
 * Main function: generate, validate, plan
 * `push` is a callback: push({ sender, text }) whenever a message is ready
 */
export async function generateAndValidatePddl(text, planner_id, push) {
  // 1️⃣ Generate domain & problem
  const { generated_domain, generated_problem } = await generatePddl(text, push);
  if (!generated_domain || !generated_problem) return;

  // 2️⃣ Validate domain
  await validatePddl(generated_domain, "domain", push);

  // 3️⃣ Validate problem
  await validatePddl(generated_problem, "problem", push);

  // 4️⃣ Validate domain/problem match
  await validatePddlMatch(generated_domain, generated_problem, push);

  // 5️⃣ Post plan & poll
  await postAndPollPlan(generated_domain, generated_problem, planner_id, push);
}
