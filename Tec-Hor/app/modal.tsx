import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Instrução</Text>
      <View style={styles.separator} />
      <View>
         <Text> Com o  Tec-Hor é facil</Text>
         <Text> Abra a Aba upload e aponte a camera para a planta</Text>

      
      </View>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "green"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
