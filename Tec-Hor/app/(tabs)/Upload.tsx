import { styles } from '@/src/style/style';
import { Text, View } from '@/components/Themed';
import  IndPlant  from '../../src/screen/indPlant';
import { useId } from '@/src/services/zustand/UserIdZustand'
import { useRouter } from 'expo-router';

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
        {!idUser && 
      
              <Text style={styles.txt}>faça o login</Text>
      
        } 
      {idUser && <View style={styles.planta}> <IndPlant/> </View>}
      
    </View>
    
  );
}

