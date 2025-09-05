import { styles } from '@/src/style/style';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '@/components/Themed';
import  IndPlant  from '../../src/screen/indPlant';
import { useId } from '@/src/services/zustand/UserIdZustand'
import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';

 export function navigateToLogin() {
    const router = useRouter();
    router.push("/login");
  }

export default function TabTwoScreen() {
 
  const idUser = useId((state) => state.id) 
    if(!idUser){
      }
  return (
    <View style={styles.container}>
     
      
      <Text style={styles.title}> Uploader</Text>
        {!idUser && <View>
      <Pressable onPress={navigateToLogin}><Text style={styles.button2}>ir para login</Text></Pressable></View>
      }
       
      <View style={styles.planta}> <IndPlant/> </View>
      
    </View>
    
  );
}

