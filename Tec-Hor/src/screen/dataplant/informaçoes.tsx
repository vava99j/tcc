// No arquivo DataPlantInfo.tsx

import DataPlant from "./dataPlant"; // Note a letra maiúscula para seguir a convenção de componentes

// O componente DataPlantInfo precisa receber props, que é um objeto
// com a propriedade 'hor'.
export default async function DataPlantInfo({ hor }: { hor: string }) {
  // Use a sintaxe JSX para renderizar o componente DataPlant
  return <DataPlant hor={hor} />;
}