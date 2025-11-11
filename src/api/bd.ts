import axios from 'axios';

export interface t {
  id: number;
  usuario_id: number;
  horarios: string;
  foto_url: string;
  nomepl: string;
}

const API_BASE = "https://servidor-632w.onrender.com";
const API_FALLBACK = "https://tec-hor.vercel.app";

export async function getByUser<t>(idUser: string, subDom : string): Promise<t[]> {
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
