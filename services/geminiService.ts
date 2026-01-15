import { GoogleGenAI } from "@google/genai";
import { BoardGame } from "../types";

const API_KEY = process.env.API_KEY || '';

// Initialize the client only if the key exists to avoid immediate errors, 
// though robust apps should handle missing keys gracefully in UI.
let ai: GoogleGenAI | null = null;
if (API_KEY) {
  ai = new GoogleGenAI({ apiKey: API_KEY });
}

export const getBoardGameAdvice = async (
  query: string, 
  contextGames: BoardGame[]
): Promise<string> => {
  if (!ai) {
    return "Please configure your API Key to use the Board Game Guru.";
  }

  // Construct a lean context string
  const gameContext = contextGames.map(g => `${g.title} (${g.category.join(', ')})`).join(', ');

  const systemInstruction = `You are a friendly and knowledgeable Board Game Guru. 
  You help users find games, understand rules, and get recommendations.
  You have knowledge of the following games currently in the app's database: ${gameContext}.
  However, you also have general knowledge about all board games in existence.
  Keep your answers concise, helpful, and enthusiastic. Use formatting like bullet points where appropriate.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the meeple network right now.";
  }
};