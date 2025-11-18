import axios from "axios";
import { getApi } from "./bd";

const BASE_URL = 'https://api.plant.id/v2/identify';


export async function identificarPlanta(base64Image: string) {
const API_KEY = await getApi("2")
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
