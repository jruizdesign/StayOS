import { GoogleGenerativeAI } from '@google/generative-ai';

// Access the API key from Vite's environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
  model = genAI.getGenerativeModel({ model: "gemini-pro"});
} else {
  console.warn("VITE_GEMINI_API_KEY is not set. AI Assistant will be disabled.");
}

export const generateStaffAssistance = async (userInput: string, context: string): Promise<string> => {
  if (!model) {
    return "I am currently unavailable. Please ensure the VITE_GEMINI_API_KEY is configured correctly.";
  }

  const prompt = `
    **Role:** You are an expert AI assistant for hotel staff using the StayOS Property Management System.
    **Context:** ${context}
    **User Request:** ${userInput}
    
    **Instructions:**
    1.  Analyze the user's request and the provided context.
    2.  If the request is for information, provide a concise and accurate answer based on your knowledge and the context.
    3.  If the request is to perform an action (e.g., draft an email), generate the content in a professional and helpful tone.
    4.  Format your response clearly. For longer responses, use markdown for readability (e.g., headings, bullet points).
    5.  Always be helpful and proactive. If a user's request is unclear, ask for clarification.

    **Response:**
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "I'm sorry, but I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
  }
};
