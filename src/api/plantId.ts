import axios from "axios";
import { useKey2} from '../services/zustand/key';
import { carregarKeys } from "./bd";

export async function identificarPlanta(base64Image: string) {
 const { key2 } = useKey2.getState();

  if (!key2) {
    throw new Error("API KEY 2 ainda não carregada");
  }
const BASE_URL = 'https://api.plant.id/v2/identify';
const API_KEY = key2
  try {
    const response = await axios.post(
      BASE_URL,
      {
        images: [base64Image],
        plant_language: 'pt',
        plant_details: ['common_names', 'scientific_name'],
      },
      
    {
      headers: {
        'Content-Type': 'application/json',
          'Api-Key': API_KEY,
        },
    }
    );

    return response.data;
  } catch (error) {
    console.error('Erro na identificação:', error);
    throw error;
  }
}
