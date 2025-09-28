// src/scripts/api/chat.js
import { postGeneratePddl, postConvertPddlToMermaid } from "../api/convert";
import { postValidatePddl, postValidatePddlMatch, validateProblemPlan } from "../api/validate";
import { postPlan, getPlan } from "../api/pddl";
import { generateMermaidDiagram } from "../utils/mermaid";

/**
 * Push a message to the callback if provided
 */
function pushMessage(push, text, sender = "bot") {
  if (typeof push === "function") push({ sender, text });
}

/**
 * Extract meaningful error message from a response,
 * including handling 422 Unprocessable Entity responses.
 */
function extractErrorMessage(err) {
  if (err?.response?.status === 422 && Array.isArray(err.response.data?.detail)) {
    return err.response.data.detail.map(d => d.msg).join("; ");
  }
  return err.message || JSON.stringify(err);
}

/**
 * Remove planner name from plan for cleaner display
 */
function cleanPlan(plan) {
  if (!plan) return "";
  const idx = plan.indexOf("SequentialPlan:");
  return idx >= 0 ? plan.slice(idx) : plan;
}

/**
 * Generate PDDL domain and problem from natural language
 */
export async function generatePddlFromText(text, push) {
  try {
    const res = await postGeneratePddl("problem", { text, domain: "" }, true);
    if (res?.result_status !== "success") {
      pushMessage(push, `❌ PDDL generation failed: ${res?.message || JSON.stringify(res)}`);
      return {};
    }
    pushMessage(push, "✅ PDDL generated successfully.");
    return { domain: res.generated_domain, problem: res.generated_problem };
  } catch (err) {
    pushMessage(push, `❌ Error generating PDDL: ${extractErrorMessage(err)}`);
    return {};
  }
}

/**
 * Validate PDDL content (domain or problem)
 */
export async function validatePddlContent(pddl, type, push) {
  try {
    const res = await postValidatePddl({ pddl }, type);
    if (res?.result === "success") {
      pushMessage(push, `✅ ${res.message || `${type} validated successfully.`}`);
      return true;
    }
    pushMessage(push, `❌ ${type} validation failed: ${res?.message || "Unknown error"}`);
    return false;
  } catch (err) {
    pushMessage(push, `❌ Error validating ${type}: ${extractErrorMessage(err)}`);
    return false;
  }
}

/**
 * Validate that domain and problem match
 */
export async function validateDomainProblemMatch(domain, problem, push) {
  try {
    const res = await postValidatePddlMatch({ domain, problem });
    if (res?.result === "success") {
      pushMessage(push, `✅ ${res.message || `Domain & Problem match validated.`}`);
      return true;
    }
    pushMessage(push, `❌ Domain & Problem match validation failed: ${res?.message || "Unknown error"}`);
    return false;
  } catch (err) {
    pushMessage(push, `❌ Error validating domain/problem match: ${extractErrorMessage(err)}`);
    return false;
  }
}

/**
 * Validate a generated plan against domain/problem
 */
export async function validateGeneratedPlan(domain, problem, plan, push) {
  try {
    const res = await validateProblemPlan({ domain, problem, plan: cleanPlan(plan) });
    if (res?.result === "success") {
      pushMessage(push, `✅ ${res.message || `Plan validated.`}`);
      return true;
    }
    pushMessage(push, `❌ Plan validation failed: ${res?.message || "Unknown error"}`);
    return false;
  } catch (err) {
    pushMessage(push, `❌ Error validating plan: ${extractErrorMessage(err)}`);
    return false;
  }
}

/**
 * Submit planning request and poll for completion
 */
export async function submitAndPollPlan(domain, problem, plannerId, push) {
  try {
    const res = await postPlan({ domain, problem }, plannerId);
    if (!res?.id) {
      pushMessage(push, `❌ Failed to create plan: ${JSON.stringify(res)}`);
      return null;
    }

    const jobId = res.id;
    pushMessage(push, `⏳ Job created: ${jobId}. Waiting for plan...`);

    const start = Date.now();
    const TIMEOUT = 30000;
    const INTERVAL = 5000;

    while (Date.now() - start < TIMEOUT) {
      const planStatus = await getPlan(jobId);

      if (planStatus.plan) {
        const cleaned = cleanPlan(planStatus.plan);
        pushMessage(push, `✅ Plan ready:<br>${cleaned}`);
        return cleaned;
      }

      if (planStatus.detail?.includes("not yet ready")) {
        await new Promise(r => setTimeout(r, INTERVAL));
        continue;
      }

      pushMessage(push, `⚠️ Unexpected plan response: ${JSON.stringify(planStatus)}`);
      return null;
    }

    pushMessage(push, `❌ Plan timeout: Job ${jobId} did not finish within ${TIMEOUT / 1000}s.`);
    return null;
  } catch (err) {
    pushMessage(push, `❌ Error during plan execution: ${extractErrorMessage(err)}`);
    return null;
  }
}

/**
 * Convert PDDL or plan to Mermaid diagram and push as image
 */
export async function convertPddlToMermaidDiagram(pddl, type, push) {
  try {
    const res = await postConvertPddlToMermaid({ pddl }, type);
    if (res?.result_status !== "success") {
      pushMessage(push, `❌ Failed to convert ${type} to Mermaid: ${res?.message || "Unknown error"}`);
      return false;
    }

    const mermaidCode = res.conversion_result;

    try {
      const { svg } = await generateMermaidDiagram(mermaidCode);
      const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

      pushMessage(
        push,
        `<strong>${type.charAt(0).toUpperCase() + type.slice(1)}</strong><br><img src="${svgDataUrl}" alt="${type} diagram"/>`
      );

      return true;
    } catch (err) {
      pushMessage(push, `⚠️ Mermaid rendering failed for ${type}: ${err.message || err}`);
      return false;
    }
  } catch (err) {
    console.error(err);
    pushMessage(push, `❌ Error converting ${type} to Mermaid: ${err.message || err}`);
    return false;
  }
}

/**
 * Main chat flow: generate → validate → plan → convert
 */
export async function runChatFlow(text, plannerId, push) {
  const { domain, problem } = await generatePddlFromText(text, push);
  if (!domain || !problem) return;

  if (!(await validatePddlContent(domain, "domain", push))) return;
  if (!(await validatePddlContent(problem, "problem", push))) return;
  if (!(await validateDomainProblemMatch(domain, problem, push))) return;

  const plan = await submitAndPollPlan(domain, problem, plannerId, push);
  if (!plan) return;

  if (!(await validateGeneratedPlan(domain, problem, plan, push))) return;

  await convertPddlToMermaidDiagram(domain, "domain", push);
  await convertPddlToMermaidDiagram(problem, "problem", push);
  await convertPddlToMermaidDiagram(plan, "plan", push);
}
