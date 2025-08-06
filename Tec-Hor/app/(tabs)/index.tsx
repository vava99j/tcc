import { StyleSheet } from 'react-native';
import { Text, View , Pressable } from 'react-native';
import DataPlant from '../../src/components/dataPlant';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tec-Hor</Text>
      <View style={styles.planta}> <DataPlant/> </View>
    
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
    fontSize: 50,
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
