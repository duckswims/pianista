import { postGeneratePddl } from "./convert";
import { postValidatePddl } from "./validate";

/**
 * Generate PDDL and validate both domain and problem.
 * Returns messages ready to send to chat.
 * @param {string} text - user input
 * @returns {Promise<Array<{sender:string,text:string}>>}
 */
export async function generateAndValidatePddl(text) {
  const messages = [];

  try {
    // 1. Generate PDDL
    const genRes = await postGeneratePddl("problem", { text, domain: "" }, true);

    if (genRes?.result_status === "success") {
      messages.push({
        sender: "bot",
        text: "✅ Domain and Problem generated."
      });

      const { generated_domain, generated_problem } = genRes;

      // 2. Validate domain
      const domainValidation = await postValidatePddl(
        { pddl: generated_domain },
        "domain"
      );

      if (domainValidation?.result === "success") {
        messages.push({
          sender: "bot",
          text: `✅ Domain validated successfully: ${domainValidation.message || ""}`
        });
      } else {
        messages.push({
          sender: "bot",
          text: `⚠️ Domain validation failed: ${domainValidation?.message || "Unknown error"}`
        });
      }

      // 3. Validate problem
      const problemValidation = await postValidatePddl(
        { pddl: generated_problem },
        "problem"
      );

      if (problemValidation?.result === "success") {
        messages.push({
          sender: "bot",
          text: `✅ Problem validated successfully: ${problemValidation.message || ""}`
        });
      } else {
        messages.push({
          sender: "bot",
          text: `⚠️ Problem validation failed: ${problemValidation?.message || "Unknown error"}`
        });
      }

    } else {
      messages.push({
        sender: "bot",
        text: `❌ PDDL generation failed: ${genRes?.message || JSON.stringify(genRes)}`
      });
    }

  } catch (err) {
    console.error(err);
    messages.push({
      sender: "bot",
      text: `❌ Error generating or validating PDDL: ${err.message || err}`
    });
  }

  return messages;
}
