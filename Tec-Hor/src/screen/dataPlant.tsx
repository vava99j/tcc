import React from 'react';
import { useId } from '../services/zustand/UserIdZustand';
import { View, Text, Image , ScrollView, Pressable} from 'react-native';
import { styles } from '@/src/style/style';


export default function DataPlant() {
  const idUser = useId((state) => state.id) 


 
  if(!idUser){return(<View><Text style={styles.txt}>faça o login</Text> </View>)}
  else{return (<View><Text style={styles.txt}>login feito </Text> </View>) }

  /*return (
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
   
  );*/
}
