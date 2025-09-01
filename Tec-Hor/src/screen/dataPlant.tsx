import React from 'react';
import { useStore } from '../services/zustand';
import { useFot } from '@/src/services/fotoZustand';
import { View, Text, Image , ScrollView, Pressable} from 'react-native';
import { styles } from '@/src/style/style';


export default function DataPlant() {
  const hor = useStore((state) => state.hor);
  const fot = useFot((state) => state.foto);

  console.log(`hooor: ${hor}`);
  console.log(`foto URI: ${fot}`);
if(hor == '' && fot == '')return(<View><Text style={styles.txt}>Nenhuma Planta cadastrada😢🌱</Text> </View>)
  return (
      <ScrollView>
        <View style={styles.dataPlanta}>
             <Image
          source={{ uri: fot }}
          style={{ width: 150, height: 150, marginTop: 5, borderRadius:10 }}
          resizeMode="cover"
        />
      <Text style={styles.txt}>{hor}</Text> <Pressable ><Text style={styles.button}>Excluir</Text></Pressable>
     
      </View>
       
      
      </ScrollView>
   
  );
}
