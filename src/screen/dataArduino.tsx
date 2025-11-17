import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { styles } from '@/src/style/style';
import { useId } from '../services/zustand/UserIdZustand';
import { getByUser } from '../api/bd';


interface Arduino {
  id: number;
  usuario_id: number;
  cod_ard: string;
  umd: string
}

const ArduinoList = () => {
  const [arduinos, setArduinos] = useState<Arduino[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const idUser = useId((state) => state.id);

  useEffect(() => {
      let ignore = false;
  
      async function load() {
        try {
          const data = await getByUser<Arduino>(idUser, "arduino");
          if (!ignore) {
            setArduinos(data);
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


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="green" />
        <Text>Carregando Estufa/s...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={arduinos}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => <View style={{ padding: 10 }} />}
      ListFooterComponent={() => <View style={{ height: 'auto' }} />}
      renderItem={({ item }) => (
        <View style={styles.dataPlanta1}>
          <View style={styles.row}>
            <Text>Cod. Estufa:</Text><Text style={styles.txtg}> {item.cod_ard}</Text>
          </View>
          <View style={styles.row}>
            <Text>Cod. Estufa:</Text><Text style={styles.txtg}> {item.umd}</Text>
          </View>

        </View>
      )}
    />
  );
};

export default ArduinoList;
