import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateChatResponse(prompt, roleModel) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const context = `You are ${roleModel}. Respond in character, maintaining the personality, knowledge, and speaking style of ${roleModel}.`;

    const result = await model.generateContent(`${context}\nUser: ${prompt}`);

    const response = await result.response;
    return response.candidates[0]?.content.parts[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Error generating response:", error);
    return "I'm having trouble responding right now.";
  }
}
