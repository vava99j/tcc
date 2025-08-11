import { styles } from '@/style/style';
import { Text, View , Pressable } from 'react-native';
import DataPlant from '../../src/components/dataPlant';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tec-Hor</Text>
      <View style={styles.planta}> <DataPlant/> </View>
    
    </View>
  );
}


