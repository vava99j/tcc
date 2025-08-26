// PlantIdentifierScreen.tsx
import { styles } from '@/src/style/style';
import React, { useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator  , Pressable} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { identificarPlanta } from '../api/plantId';// Importe a função corretamente
import { gemini } from '@/src/api/gemini';
import { useFot} from '../services/fotoZustand';

export default function 
() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cuidados, setCuidados] = useState<any>(null);
  const {setFoto} = useFot.getState()

  const escolherImagem = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });

    if (!pickerResult.canceled) {
      const base64 = pickerResult.assets[0].base64;
      const uri = pickerResult.assets[0].uri;
      setImage(uri);
      setFoto(uri)
      setLoading(true);
      setResult(null);
      setCuidados(null);

      try {
        // Identifica a planta com Plant.id
        const resposta = await identificarPlanta(base64!);
        setResult(resposta);
        
        // Extrai o nome científico
       const nomeC = resposta?.suggestions?.[0]?.plant_name;
        console.log('Planta identificada:', nomeC);

        // Busca cuidados com Gemini
       const {respostagen}= await gemini(nomeC);
       setCuidados(respostagen);
     

      } catch (error) {
        alert('Erro ao identificar a planta ou buscar cuidados.');
        console.log(error);
      }
      

      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: 'white'}}>
      <Pressable onPress={escolherImagem}> <Text style={styles.button}>ESCOLHER IMAGEM</Text></Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginVertical: 10 }}
        />
      )}

      {loading && <ActivityIndicator  color="green" />}

      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            🌿 Planta Identificada:
          </Text>
          <Text>Nome científico: {result.suggestions[0].plant_name}</Text>
        </View>
      )}
      {cuidados && (
        <View style={{ marginTop: 20 }}>
        <Text>Cuidados: {cuidados}</Text>
        </View>
      )}

   
    </ScrollView>
  );
}
