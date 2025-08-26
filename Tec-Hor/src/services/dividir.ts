import dataPlant from "../screen/dataplant/dataPlant";
import arduino from "./ard";
import horarios from "./horarios";
import { useStore } from "./zustand";

export default async function dividir(input:string, nome: string) {
  const {setHor} = useStore.getState()
  const saida= input.split('---JSON---')
  console.log(saida[0] + '---JSON---' + saida[1]);
  const txtAM = saida[0]
  await arduino(saida[1])
  let hor = await horarios(saida[1],nome) 
  const respostagen = saida[0]
  setHor(hor)

  return {respostagen , }
}

