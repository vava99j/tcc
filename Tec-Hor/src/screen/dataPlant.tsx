import React, { useEffect, useState } from 'react';
import {View,Text,Image,FlatList,ActivityIndicator,Pressable,Alert,} from 'react-native';
import axios from 'axios';
import { styles } from '@/src/style/style';
import { useId } from '../services/zustand/UserIdZustand';
import Clipboard from '@react-native-clipboard/clipboard';

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

const handleCopy = (text: string) => {
  Clipboard.setString(text);
  Alert.alert('Copiado', 'Nome da planta copiado para a área de transferência.');
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
      ListFooterComponent={() => <View style={{ height: 30 }} />}
      renderItem={({ item }) => (
        <View style={styles.dataPlanta}>
          <Pressable onPress={() => handleCopy(item.nomepl)}>
            <Text style={{ color: 'blue', marginBottom: 5 }}>Copiar nome</Text>
          </Pressable>
          {item.foto_url && (
            <Image source={{ uri: item.foto_url }} style={styles.image} />
          )}
          <Text style={styles.txt}>{item.horarios}</Text>
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
