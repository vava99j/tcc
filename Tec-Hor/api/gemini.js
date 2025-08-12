
import { GoogleGenAI } from "@google/genai";

// Access the API key from an environment variable for security
const ai = new GoogleGenAI({ apiKey: "AIzaSyCkJ8hP_bSkA8h7rrL2TXMywKVkuW8xyrM"  });

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "descreva a beleza e o significado do nome Ana Clara",
  });
  console.log(response.text);
}

main();



