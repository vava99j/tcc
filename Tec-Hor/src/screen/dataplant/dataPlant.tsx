import { useStore } from '../../services/zustand'; // Caminho correto
import { View, Text } from 'react-native';

export default async function DataPlant() {
  const hor = useStore((state) => state.hor); // Correto

  console.log(`hooor: ${hor}`);

  return (
    <View>
      <Text>{hor}</Text>
    </View>
  );
}
