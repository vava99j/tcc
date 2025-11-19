import { styles } from '@/src/style/style';
import { Text, View } from '@/components/Themed';
import  IndPlant  from '../../src/screen/indPlant';
import { useId } from '@/src/services/zustand/UserIdZustand'
import { useRouter } from 'expo-router';
import { carregarKeys } from '@/src/api/bd';
import { useEffect } from 'react';

 export function navigateToLogin() {
    const router = useRouter();
    router.push("/login");
  }
export default function TabTwoScreen() {
  const router = useRouter();
  const idUser = useId((state) => state.id);

  useEffect(() => {
    carregarKeys();
  }, []);

  useEffect(() => {
    if (!idUser) router.push("/login");
  }, [idUser]);

  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Uploader</Text>
      {idUser && <View style={styles.planta}><IndPlant/></View>}
    </View>
  );
}


