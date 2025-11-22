import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  useColorScheme,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {useThemedStyles } from '@/src/style/style';
import { identificarPlanta } from '../api/plantId';
import { gemini } from '@/src/api/gemini';
import { useFot } from '../services/zustand/FotZustand';
import { useStore } from '../services/zustand/HorZustand';
import { useId } from '../services/zustand/UserIdZustand';
import { navigateToHome } from '@/src/services/navigate';
import axios from 'axios';
import BtnTH from '../.minecraft/btnth';
import Colors from "../constants/Colors";


export default function PlantIdentifierScreen() {
  const styles = useThemedStyles();
  const API_URL = 'https://servidor-632w.onrender.com';

  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [cuidados, setCuidados] = useState<string | null>(null);

  const hor = useStore((state) => state.hor);
  const fot = useFot((state) => state.foto);
  const setFoto = useFot((state) => state.setFoto);
  const idUser = useId((state) => state.id);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para escolher uma imagem.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      quality: 0.7,
    });

    if (pickerResult.canceled) return;

    const asset = pickerResult.assets?.[0];
    if (!asset) {
      Alert.alert('Erro', 'Nenhuma imagem selecionada.');
      return;
    }

    const base64 = asset.base64 ?? null;
    const uri = asset.uri ?? null;

    if (!base64 || !uri) {
      Alert.alert('Erro', 'Não foi possível obter a imagem ou o base64.');
      return;
    }
    setImage(uri);
    setFoto(`data:image/jpeg;base64,${base64}`);
    setLoading(true);
    setResult(null);
    setCuidados(null);

    try {
      const resposta = await identificarPlanta(base64);
      setResult(resposta);
      const nomeCientifico = resposta?.suggestions?.[0]?.plant_name;
      console.log('Planta identificada:', nomeCientifico);

      if (nomeCientifico) {
        try {
          const { respostagen } = await gemini(nomeCientifico);
          setCuidados(respostagen ?? null);
        } catch (errGen) {
          console.error('Erro no Gemini:', errGen);
          Alert.alert('Aviso', 'Planta identificada, mas falha ao obter cuidados (IA).');
          setCuidados(null);
        }
      } else {
        Alert.alert('Aviso', 'Planta identificada, mas sem nome científico retornado.');
      }

    } catch (err) {
      console.error('Erro identificarPlanta:', err);
      Alert.alert('Erro', 'Erro ao identificar a planta.');
    } finally {
      setLoading(false);
    }
  };

  async function handleCadPlant() {
    if (!idUser) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }
    if (!hor) {
      Alert.alert('Erro', 'Horários ausentes.');
      return;
    }
    if (!fot) {
      Alert.alert('Erro', 'Foto ausente.');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/pplanta`, {
        usuario_id: idUser,
        horarios: hor,
        foto_url: fot,
      });


      Alert.alert('Sucesso', 'Planta cadastrada com sucesso!');
      navigateToHome();

      setCuidados(null);
      setResult(null);
      setFoto('');
      setImage(null);
} catch (err) {
  if (axios.isAxiosError(err) && err.response?.status === 500) {
    return;
  }

  console.error(err);
  Alert.alert('Erro', 'Não foi possível cadastrar a planta');
}

  }

  const canSave =
    !!idUser &&
    !!hor &&
    !!fot &&
    cuidados != null &&
    result != null;

  const colorScheme = useColorScheme();
  const theme = colorScheme ?? "light";
  return (
    <ScrollView contentContainerStyle={{ padding: 20, backgroundColor:Colors[theme].background}}>
          <BtnTH label="ESCOLHER IMAGEM" onPress={escolherImagem}/>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: '100%', height: 200, marginVertical: 10 }}
          resizeMode="cover"
        />
      )}

      {loading && <ActivityIndicator size="large" />}

      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>🌿 Planta Identificada:</Text>
          <Text>Nome científico: {result.suggestions?.[0]?.plant_name ?? '—'}</Text>
        </View>
      )}

      {cuidados && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Cuidados:</Text>
          <Text>{cuidados}</Text>
        </View>
      )}

      {canSave && (
       <BtnTH label="SALVAR PLANTA" onPress={handleCadPlant}/>
      )}
      
    </ScrollView>
  );
}
