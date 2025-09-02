
import { GoogleGenAI } from "@google/genai";
import dividir from "../services/dividir";
import dataPlant from "../screen/dataPlant";


// Access the API key from an environment variable for security
const ai = new GoogleGenAI({ apiKey: "AIzaSyC13-qfSfflpU7dkXu4EnuAurX_xQAcLE4"  });

export async function gemini(input: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
   contents: "gemini você é um assistente que tem que falar da planta " + input + ", e eu quero que vc me retorne 2 resultados em uma saida (sem introduçao) , (saida1): texto amigavel que fala sobre os cuidados da planta para ela ser feliz e saudavel , apos essa saida vc ira escrever ---JSON--- e em seguida vem a (saida2) ira fazer um texto em json que ira trazer quantidade nescessaria de: agua , sol , ventilação, podaçao , irrigaçao do solo, e vc so vai poder responder nula/muito/baixa/media/alta/muito alta, mas nao deixe explissito que te pedi duas saidas , nao inclua o nome da planta no json, eu vou usar esse json no meu projeto em js entao me mande o json no formato que consigo usar no js ou seja sem aspas fora do {}, apenas dentro do {}",
     });
  console.log(response.text);
const txt = await dividir(response.text || '' , input);


return txt
}




