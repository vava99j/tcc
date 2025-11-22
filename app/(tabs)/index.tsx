import {useThemedStyles } from '@/src/style/style';
import {Text, View } from 'react-native';
import DataPlant from '../../src/screen/dataPlant';
import { useId } from '@/src/services/zustand/UserIdZustand';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import BtnTH from '@/src/.minecraft/btnth';

export default function TabOneScreen() {
  const styles = useThemedStyles();
  const idUser = useId((state) => state.id);
const [refresh, setRefresh] = useState(0);

function reload() {
  setRefresh(r => r + 1); 
}
 
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
      <BtnTH icon={<MaterialIcons name="refresh" size={20} color="white" />} onPress={reload} />
          <DataPlant key={refresh} />
        </View>
      )}
    </View>
  );
}
