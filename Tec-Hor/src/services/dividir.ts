import dataPlant from "../screen/dataplant/dataPlant";
import dataPlantInfo from "../screen/dataplant/informaçoes";
import arduino from "./ard";
import horarios from "./horarios";

export default async function dividir(input:string) {
  const saida= input.split('---JSON---')
  console.log(saida[0] + '---JSON---' + saida[1]);
  const txtAM = saida[0]
  await arduino(saida[1])
  let hor = await horarios(saida[1]) 
  hor += txtAM
  dataPlantInfo(hor)
  return saida[0]
}