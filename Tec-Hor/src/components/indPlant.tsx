// PlantIdentifierScreen.tsx

import React, { useState } from 'react';
import { View, Text, Button, Image, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { identificarPlanta } from '../../api/plantId';
import { buscarCuidadosGemini } from '../../api/gemini'; // Importe a função corretamente

export default function PlantIdentifierScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cuidados, setCuidados] = useState<any>(null);

  const escolherImagem = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });

    if (!pickerResult.canceled) {
      const base64 = pickerResult.assets[0].base64;
      const uri = pickerResult.assets[0].uri;
      setImage(uri);
      setLoading(true);
      setResult(null);
      setCuidados(null);

      try {
        // Identifica a planta com Plant.id
        const resposta = await identificarPlanta(base64!);
        setResult(resposta);

        // Extrai o nome científico
        const nome = resposta?.suggestions?.[0]?.plant_name;
        console.log('Planta identificada:', nome);

        // Se tiver nome, busca os cuidados no Gemini
        if (nome) {
          const dados = await buscarCuidadosGemini(nome);
          setCuidados(dados);
        }
      } catch (error) {
        alert('Erro ao identificar a planta ou buscar cuidados.');
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Button title="Escolher imagem" onPress={escolherImagem} />

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginVertical: 10 }}
        />
      )}

      {loading && <ActivityIndicator size="large" color="green" />}

      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            🌿 Planta Identificada:
          </Text>
          <Text>Nome científico: {result?.suggestions?.[0]?.plant_name}</Text>
        </View>
      )}

      {cuidados && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>🌱 Cuidados da planta:</Text>
          <Text>💧 Rega: {cuidados.rega}</Text>
          <Text>🌞 Sol: {cuidados.sol}</Text>
          <Text>💨 Ventilação: {cuidados.ventilacao}</Text>
          <Text>🌱 Solo: {cuidados.solo}</Text>
          <Text>✂️ Poda: {cuidados.poda}</Text>
        </View>
      )}
    </ScrollView>
  );
}
