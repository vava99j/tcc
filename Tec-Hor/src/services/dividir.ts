import arduino from "./ard";

export default async function dividir(input:string) {
  const saida= input.split('---JSON---')
  console.log(saida[0] + '---JSON---' + saida[1]);
  arduino(saida[1])
  return saida[0]
}