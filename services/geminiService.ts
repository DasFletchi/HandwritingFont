
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCreativeDraft = async (prompt: string): Promise<string> => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional calligrapher and letter writer. 
      Generate a realistic, heart-felt, or professional draft based on this prompt: "${prompt}". 
      Keep it human-like and natural. Only return the text of the letter/note itself.`,
      config: {
        temperature: 0.8,
        topP: 0.9,
      }
    });
    return response.text || "Sorry, I couldn't generate a draft right now.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating content. Please try again.";
  }
};
