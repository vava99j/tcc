import { StyleSheet } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '@/components/Themed';
import  IndPlant  from '../../src/components/indPlant';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Uploader</Text>
      <View style={styles.planta}> <IndPlant/> </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "green"
  },
    planta: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "green",
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 10,
    height: "80%",
    width: "98%",
    alignItems: 'center',
  },

});
