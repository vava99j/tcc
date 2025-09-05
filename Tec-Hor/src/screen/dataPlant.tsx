import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, Pressable, ScrollView } from 'react-native';
import axios from 'axios';
import { styles } from '@/src/style/style';

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

  useEffect(() => {
    async function fetchPlantas() {
      try {
        const response = await axios.get<Planta[]>(`${API_BASE}/1`);
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
  try {
    await axios.delete(`${API_BASE}/planta/${id}`);
    // Atualiza localmente removendo a planta do estado
    setPlantas(prev => prev.filter(p => p.id !== id));
  } catch (err) {
    console.error('Erro ao deletar planta:', err);
  }
};




  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Carregando plantas...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
    <FlatList
  data={plantas}
  keyExtractor={(item) => item.id.toString()}
  ListHeaderComponent={() => (
    <View style={{ padding: 15 }}>
    </View>
  )}
  renderItem={({ item }) => (
    <View style={styles.dataPlanta}>
      {item.foto_url && (
        <Image source={{ uri: item.foto_url }} style={styles.image} />
      )}
      <Text style={styles.txt}>{item.horarios}</Text>
       <Pressable onPress={() => handleDeleteClick(item.id)}>
  <Text style={styles.button}>DELETAR PLANTA</Text>
</Pressable>


    </View>
  )}
/>
<View />
    </ScrollView>
  );
};



export default PlantList;
