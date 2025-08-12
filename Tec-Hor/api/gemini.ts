
import { GoogleGenAI } from "@google/genai";

// Access the API key from an environment variable for security
const ai = new GoogleGenAI({ apiKey: "AIzaSyCkJ8hP_bSkA8h7rrL2TXMywKVkuW8xyrM"  });

export async function gemini(input: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
   contents: "Principais cuidados da planta " + input + ", retorne com os tópicos: rega (nula/muito baixa/baixa/média/alta/muito alta), luz (nenhuma/baixa/média/alta/sol pleno), ventilação (nenhuma/baixa/média/alta), poda (nunca/rara/ocasional/frequente) e irrigação do solo (nula/muito baixa/baixa/média/alta/muito alta), cada um com apenas uma linha."
  });
  console.log(response.text);

  return response.text
  
}




