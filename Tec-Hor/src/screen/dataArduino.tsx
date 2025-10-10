import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  Alert,
} from 'react-native';
import axios from 'axios';
import { styles } from '@/src/style/style';
import { useId } from '../services/zustand/UserIdZustand';


interface Planta {
  id: number;
  usuario_id: number;
  foto_url: string;
  cod_ard: string;
}

const API_BASE = 'https://servidor-632w.onrender.com/arduino';

const ArduinoList = () => {
  const [arduinos, setArduinos] = useState<Planta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const idUser = useId((state) => state.id);

  useEffect(() => {
    async function fetchArduino() {
      try {
        const response = await axios.get<Planta[]>(`${API_BASE}/${idUser}`);
        const data = response.data;
        const arr = Array.isArray(data) ? data : [data];
        setArduinos(arr);
      } catch (error) {
        console.error('Erro ao buscar arduinos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchArduino();
  }, [idUser]);

  const handleDelete = async (id: number) => {
    if (deletingId !== null) return;

    try {
      setDeletingId(id);
      
    } catch (err) {
      console.error('Erro ao deletar planta:', err);
      Alert.alert('Erro', 'Não foi possível deletar a Estufa. Tente novamente.');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="green" />
        <Text>Carregando Estufa/s...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={arduinos}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <View style={{ padding: 15 }} />}
      ListFooterComponent={() => <View style={{ height: 30 }} />}
      renderItem={({ item }) => (
        <View style={styles.dataPlanta}>
          <Text style={styles.txt}>{item.cod_ard}</Text>

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
              <Text style={styles.txtW}>DELETAR ESTUFA</Text>
            )}
          </Pressable>
        </View>
      )}
    />
  );
};

export default ArduinoList;
