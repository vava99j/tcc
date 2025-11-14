import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from '@/src/style/style';
import { identificarPlanta } from '../api/plantId';
import { gemini } from '@/src/api/gemini';
import { useFot } from '../services/zustand/FotZustand';
import { useStore } from '../services/zustand/HorZustand';
import { useId } from '../services/zustand/UserIdZustand';
import axios from 'axios';

export default function PlantIdentifierScreen() {
  const API_URL = 'https://servidor-632w.onrender.com';

  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [cuidados, setCuidados] = useState<any>(null);

  const hor = useStore((state) => state.hor);
  const fot = useFot((state) => state.foto);
  const idUser = useId((state) => state.id);
  const { setFoto } = useFot.getState();

  const escolherImagem = async () => {
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });

    if (!pickerResult.canceled) {
      const base64 = pickerResult.assets[0].base64;
      const uri = pickerResult.assets[0].uri;

      setImage(uri);
      setFoto(`data:image/jpeg;base64,${base64}`);
      setLoading(true);
      setResult(null);
      setCuidados(null);

      try {
        const resposta = await identificarPlanta(base64!);
        setResult(resposta);

        const nomeCientifico = resposta?.suggestions?.[0]?.plant_name;
        console.log('Planta identificada:', nomeCientifico);

        const { respostagen } = await gemini(nomeCientifico);
        setCuidados(respostagen);
      } catch (error) {
        Alert.alert('Erro', 'Erro ao identificar a planta ou buscar cuidados.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };



  async function handleCadPlant() {
    console.log("Enviando dados:", { usuario_id: idUser, horarios: hor, foto_url: fot });

   if (!idUser || !hor || !fot) {
      Alert.alert('Erro', 'Faltam dados obrigatórios');
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/pplanta`, {
        usuario_id: idUser,
        horarios: hor,
        foto_url: fot,
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error("Erro ao cadastrar usuário");
      }

      setCuidados(null);
      setResult(null);
      setFoto('');
      setImage(null);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
    }
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: 'white' }}>
      <Pressable
        onPress={escolherImagem}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? '#b0dca8' : 'green',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 10,
          },
        ]}
      >
        <Text style={styles.txtW}>ESCOLHER IMAGEM</Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginVertical: 10 }}
        />
      )}

      {/* Indicador de carregamento */}
      {loading && <ActivityIndicator color="green" />}

      {/* Resultado da identificação */}
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>🌿 Planta Identificada:</Text>
          <Text>Nome científico: {result.suggestions[0].plant_name}</Text>
        </View>
      )}

      {/* Cuidados com a planta */}
      {cuidados && (
        <View style={{ marginTop: 20 }}>
          <Text>Cuidados: {cuidados}</Text>
        </View>
      )}

      {/* Botão de salvar planta */}
      {idUser && hor && fot && cuidados && result && (
        <Pressable
          onPress={handleCadPlant}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? '#b0dca8' : 'green',
              paddingVertical: 10,
              paddingHorizontal: 15,
              borderRadius: 8,
              alignItems: 'center',
              marginTop: 10,
            },
          ]}
        >
          <Text style={styles.txtW}>SALVAR PLANTA</Text>
        </Pressable>
      )}
    </ScrollView>
  );
}
