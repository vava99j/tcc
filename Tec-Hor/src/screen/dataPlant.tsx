import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, Pressable, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '@/src/style/style';
import { useId } from '../services/zustand/UserIdZustand';

interface Planta {
  id: number;
  usuario_id: number;
  horarios: string;
  foto_url: string;
}

const API_BASE = 'https://servidor-632w.onrender.com/plantas';

const PlantList = () => {
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const idUser = useId((state) => state.id);

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
  }, []);

  const handleDeleteClick = async (id: number) => {
    if (deletingId !== null) return; // evita múltiplos cliques simultâneos

    try {
      setDeletingId(id);
      await axios.delete(`${API_BASE}/${id}`);
      setPlantas(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Erro ao deletar planta:', err);
      Alert.alert('Erro', 'Não foi possível deletar a planta. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
        <Text>Carregando plantas...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={plantas}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <View style={{ padding: 15 }} />}
      ListFooterComponent={() => <View style={{ height: 30 }} />} // espaço no final da lista
      renderItem={({ item }) => (
        <View style={styles.dataPlanta}>
          {item.foto_url && (
            <Image source={{ uri: item.foto_url }} style={styles.image} />
          )}
          <Text style={styles.txt}>{item.horarios}</Text>
          <Pressable
            onPress={() => handleDeleteClick(item.id)}
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
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: 'white', fontWeight: 'bold' }}>DELETAR PLANTA</Text>
            )}
          </Pressable>
        </View>
      )}
    />
  );
};

export default PlantList;
