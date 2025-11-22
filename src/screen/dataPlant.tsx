import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import * as Clipboard from 'expo-clipboard';
import {useThemedStyles } from '@/src/style/style';
import { useId } from '../services/zustand/UserIdZustand';
import { getByUser } from '@/src/api/bd';
import BtnTH from '../.minecraft/btnth';
import { MaterialIcons } from '@expo/vector-icons';


interface Planta {
  id: number;
  usuario_id: number;
  horarios: string;
  foto_url: string;
  nomepl: string;
}

const PlantList = () => {
  const styles = useThemedStyles();
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const idUser = useId((state) => state.id);

  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await getByUser<Planta>(idUser, "plantas");
        if (!ignore) {
          setPlantas(data);
        }
      } catch (err) {
        if (!ignore) {
          Alert.alert('Erro', 'Não foi possível carregar as plantas.');
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [idUser]);

  const handleDelete = async (id: number) => {
    if (deletingId !== null) return;

    try {
      setDeletingId(id);
      await axios.delete(`https://servidor-632w.onrender.com/plantas/${id}`);
      setPlantas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      try {
        setDeletingId(id);
        await axios.delete(`https://tec-hor.vercel.app/plantas/${id}`);
        setPlantas((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error('Erro ao deletar planta:', err);
        Alert.alert('Erro', 'Não foi possível deletar a planta. Tente novamente.');;
      }
    } finally {
      setDeletingId(null);
    }
  };
  const handleCopy = async (text: string) => {
    try {
      await Clipboard.setStringAsync(text);
      Alert.alert('Copiado!', 'Horário copiado para a área de transferência.');
    } catch (error) {
      console.error('Erro ao copiar texto:', error);
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
      ListFooterComponent={() => <View style={{ height: 30 }} />}
      renderItem={({ item }) => (
        <View style={styles.dataPlanta}>
          <View style={styles.row}>
            <BtnTH icon={<MaterialIcons name="content-copy" size={24} color="white" />
            } onPress={() => handleCopy(item.horarios)} />

            <BtnTH icon={<MaterialIcons name="delete" size={24} color="red" />
            } onPress={() => handleDelete(item.id)} />
          </View>

          {item.foto_url ? (
            <Image source={{ uri: item.foto_url }} style={styles.image} />
          ) : (
            <Text style={styles.txt}>Sem foto</Text>
          )}
          <View style={{
            padding: 7
          }}>   <Text style={styles.txt}>{item.horarios}</Text></View>

        </View>
      )}
    />
  );
};

export default PlantList;
