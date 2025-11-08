import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('🚫 Gemini API key is missing. Please set VITE_GEMINI_API_KEY in your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

/**
 * Generate structured health advice using Gemini 1.5 Pro
 * @param {string} question - The user's health-related query
 * @returns {Promise<Object>} - Health assessment object
 */
export async function getHealthAdvice(question) {
  try {
    const prompt = `
You are an AI medical assistant. Based on the following user question, respond ONLY in pure JSON format (no markdown, no commentary). If the advice suggests seeing a doctor, the \`shouldSeeDoctor\` field should contain a string with the recommended specialty (e.g., "General Physician", "Dermatologist"). If no doctor visit is needed, the field should be \`null\`. Use this structure:

{
  "issue": "short condition name",
  "urgency": "Low | Moderate | High",
  "advice": "2-3 sentences of helpful advice",
  "shouldSeeDoctor": "null | specific doctor specialty"
}

User's question: ${question}
`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();

    console.log("🧠 Gemini Raw Response:", responseText);

    // ✅ Strip code block formatting if present
    const cleanJson = responseText
      .replace(/```json|```/g, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleanJson);
    } catch (err) {
      console.error("⚠️ Failed to parse cleaned Gemini JSON:", cleanJson);
      throw new Error("Invalid response format from AI");
    }

    // ✅ Validate and return structured data
    const issue = parsed.issue?.trim();
    const urgency = parsed.urgency?.trim();
    const advice = parsed.advice?.trim();
    const shouldSeeDoctor = parsed.shouldSeeDoctor === null ? null : parsed.shouldSeeDoctor;

    if (!issue || !advice) {
      throw new Error("Incomplete data in Gemini response");
    }

    return {
      issue,
      urgency,
      advice,
      shouldSeeDoctor,
    };

  } catch (err) {
    console.error("❌ Error from Gemini:", err.message);

    // ✅ Safe fallback response with backtick quotes to fix syntax
    return {
      issue: "Health Check Failed",
      urgency: "Unknown",
      advice: `We couldn't analyze your question at the moment. Please try again or consult a medical professional.`,
      shouldSeeDoctor: "General Physician",
    };
  }
}
