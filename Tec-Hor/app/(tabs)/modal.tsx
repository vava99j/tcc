import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';
import { styles } from '@/style/style';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrução</Text>
      <View style={styles.separator} />
      <View>
         <Text> Com o  Tec-Hor é facil 
          Abra a Aba upload e aponte a camera para a planta</Text>

      
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}


