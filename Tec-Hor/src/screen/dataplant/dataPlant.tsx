// No arquivo DataPlant.tsx

import { View, Text } from 'react-native';

// O componente DataPlant deve receber um objeto de propriedades (props).
export default async function DataPlant({ hor }: { hor: string }) {
  console.log(` hooorr:${hor}`);
  return (
    <View>
      {/* Agora você pode usar a propriedade 'hor' aqui */}
      <Text>{hor}</Text> 
    </View>
  );
}