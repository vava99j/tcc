
import { GoogleGenAI } from "@google/genai";
import dividir from "../services/dividir";

// Access the API key from an environment variable for security
const ai = new GoogleGenAI({ apiKey: "AIzaSyCkJ8hP_bSkA8h7rrL2TXMywKVkuW8xyrM"  });

export async function gemini(input: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
   contents: "geminin vc é um assistente que tem que falar da planta " + input + ", e eu quero que vc me retorne 2 resultados em uma saida , (saida1): texto amigavel que fala sobre os cuidados da planta para ela ser feliz e saudavel , apos essa saida vc ira escrever ---JSON--- e em seguida vem a (saida2) ira fazer um texto em json que ira trazer quantidade nescessaria de agua , sol , ventilação, podaçao , irrigaçao do solo, e vc so vai poder responder nula/muito/baixa/media/alta/muito alta, mas nao deixe explissito que te pedi duas saidas"
     });
  console.log(response.text);
const txt = await dividir(response.text || '');
  return txt
}




