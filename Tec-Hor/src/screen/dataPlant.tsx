import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import { styles } from '@/src/style/style';
import { useId } from '../services/zustand/UserIdZustand';

interface Planta {
  id: number;
  usuario_id: number;
  horarios: string;
  foto_url: string;
  nomepl: string;
}

const API_BASE = 'https://servidor-632w.onrender.com/plantas';

const PlantList = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const idUser = useId((state) => state.id);

  // Buscar plantas do usuário
  useEffect(() => {
    async function fetchPlantas() {
      try {
        const response = await axios.get<Planta[]>(`${API_BASE}/${idUser}`);
        const data = response.data;
        const arr = Array.isArray(data) ? data : [data];
        setPlantas(arr);
      } catch (error) {
        console.error('Erro ao buscar plantas:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlantas();
  }, [idUser]);

  // Deletar planta
  const handleDelete = async (id: number) => {
    if (deletingId !== null) return;

    try {
      setDeletingId(id);
      await axios.delete(`${API_BASE}/${id}`);
      setPlantas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Erro ao deletar planta:', err);
      Alert.alert('Erro', 'Não foi possível deletar a planta. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  // Copiar horários para a área de transferência
  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copiado!', 'Horário copiado para a área de transferência.');
    } catch (error) {
      console.error('Erro ao copiar texto:', error);
    }
  };

  // Tela de carregamento
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
        <Text>Carregando plantas...</Text>
      </View>
    );
  }

  // Render da lista de plantas
  return (
    <FlatList
      data={plantas}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <View style={{ padding: 15 }} />}
      ListFooterComponent={() => <View style={{ height: 30 }} />}
      renderItem={({ item }) => (
        <View style={styles.dataPlanta}>
          {/* Botão de copiar horários */}
          <Pressable
            onPress={() => handleCopy(item.horarios)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#b0dca8' : 'green',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
                marginVertical: 2,
              },
            ]}
          >
            <Text style={styles.txtW}>Copiar Horários</Text>
          </Pressable>

          {/* Imagem da planta */}
          {item.foto_url && (
            <Image source={{ uri: item.foto_url }} style={styles.image} />
          )}

          {/* Texto com os horários */}
          <Text style={styles.txt}>{item.horarios}</Text>

          {/* Botão de deletar */}
          <Pressable
            onPress={() => handleDelete(item.id)}
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
            disabled={deletingId === item.id}
          >
            {deletingId === item.id ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.txtW}>DELETAR PLANTA</Text>
            )}
          </Pressable>
        </View>
      )}
    />
  );
};

export default PlantList;
