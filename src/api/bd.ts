import axios from 'axios';
import { useKey1 , useKey2 } from '../services/zustand/key';

export interface t {
  key_api: string;
  id: number;
  usuario_id: number;
  horarios: string;
  foto_url: string;
  nomepl: string;
}
interface ApiKeyResponse {
  key_api: string;
}

const API_BASE = "https://servidor-632w.onrender.com";
const API_FALLBACK = "https://tec-hor.vercel.app";

export async function getByUser<t>(idUser: string, subDom: string): Promise<t[]> {
  try {
    const response = await axios.get<t[]>(`${API_BASE}/${subDom}/${idUser}`);
    const data = response.data;
    return Array.isArray(data) ? data : [data];

  } catch (error) {
    console.warn("Erro na API principal, tentando fallback...");

    try {
      const response = await axios.get<t[]>(`${API_FALLBACK}/${subDom}/${idUser}`);
      const data = response.data;
      return Array.isArray(data) ? data : [data];

    } catch (finalError) {
      console.error("Ambas as APIs falharam:", finalError);
      throw new Error("Não foi possível carregar as plantas");
    }
  }
}


export async function getApi(id: string): Promise<string> {
  async function fetchApi(url: string): Promise<string> {
    const response = await axios.get<ApiKeyResponse[]>(`${url}/API/${id}`);
    const data = response.data;
    if (!data || data.length === 0) {
      throw new Error("Resposta vazia da API");
    }
    return data[0].key_api;
  }
  try {
    return await fetchApi(API_BASE);
  } catch (err) {
    console.warn("API principal falhou, tentando fallback...");
    try {
      return await fetchApi(API_FALLBACK);
    } catch (finalError) {
      console.error("Ambas as APIs falharam:", finalError);
      throw new Error("Não foi possível carregar KEY_API");
    }
  }
}

export async function carregarKeys() {
  const apiKey1 = await getApi("1");
  const apiKey2 = await getApi("2");

  const { setKey1 } = useKey1.getState();
  const { setKey2 } = useKey2.getState();

  setKey1(apiKey1);
  setKey2(apiKey2); 

  console.log(apiKey1)
  console.log(apiKey2)
}
