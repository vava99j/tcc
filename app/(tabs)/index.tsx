import { styles } from '@/src/style/style';
import { Text, View } from 'react-native';
import DataPlant from '../../src/screen/dataPlant';
import { useId } from '@/src/services/zustand/UserIdZustand';

export default function TabOneScreen() {
  const idUser = useId((state) => state.id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tec-Hor</Text>

      {!idUser && (
        <View>
          <Text style={styles.txt}>Faça o login</Text>
        </View>
      )}

      {idUser && (
        <View>
          <DataPlant />
        </View>
      )}
    </View>
  );
}
