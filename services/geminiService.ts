import { GoogleGenAI } from "@google/genai";

// Initialize the API client.
// NOTE: In a real deployment, this key should be handled via a secure backend proxy or carefully managed env var.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const MODEL_NAME = 'gemini-3-flash-preview';

/**
 * Generates a response from the AI for hotel staff assistance.
 * It uses a system instruction to ground the AI in the context of a hotel PMS.
 */
export const generateStaffAssistance = async (prompt: string, context?: string): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const fullPrompt = context ? `Context: ${context}\n\nUser Query: ${prompt}` : prompt;
    
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: fullPrompt,
      config: {
        systemInstruction: "You are an expert Hotel Operations Assistant integrated into a Property Management System. Your goal is to help hotel staff (Reception, Housekeeping, Management) with tasks like drafting emails to guests, analyzing occupancy trends, or suggesting solutions to operational problems. Keep answers professional, concise, and hospitality-focused.",
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI assistant.";
  }
};

/**
 * Analyzes a specific operational issue or guest request.
 */
export const analyzeGuestRequest = async (requestText: string): Promise<string> => {
    if (!process.env.API_KEY) return "API Key missing.";
    
    try {
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `Guest Request: "${requestText}"\n\nSuggest 3 actionable steps for the front desk staff to handle this request effectively.`,
        });
        return response.text || "No analysis available.";
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return "Failed to analyze request.";
    }
}
