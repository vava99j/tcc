import axios from "axios";

const API_KEY = "jAEIDdSs8VxsmtuhrRr8aubiEO1QfofS432YP0X4305psxLbTe";
const BASE_URL = 'https://api.plant.id/v2/identify';


export async function identificarPlanta(base64Image: string) {
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
