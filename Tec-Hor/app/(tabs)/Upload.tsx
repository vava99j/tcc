import { styles } from '@/src/style/style';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '@/components/Themed';
import  IndPlant  from '../../src/screen/indPlant';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Uploader</Text>
      <View style={styles.planta}> <IndPlant/> </View>
      
    </View>
  );
}

