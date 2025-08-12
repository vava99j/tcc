
import { GoogleGenAI } from "@google/genai";

// Access the API key from an environment variable for security
const ai = new GoogleGenAI({ apiKey: "AIzaSyCkJ8hP_bSkA8h7rrL2TXMywKVkuW8xyrM"  });

export async function gemini(input: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "pricipais cuidados para "+ input
  });
  console.log(response.text);
   return response.text
}





