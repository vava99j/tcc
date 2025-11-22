import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useThemedStyles} from '@/src/style/style';
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
  const styles = useThemedStyles();

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
      ListHeaderComponent={() => <View style={{ margin: 0 }} />}
      ListFooterComponent={() => <View style={{ height: 'auto' }} />}
      renderItem={({ item }) => (
        <View style={styles.dataPlanta1}>
            <Text style={styles.txtg}>Cod. Estufa:{item.cod_ard}</Text>
            <Text style={styles.txtg}>Cod. Estufa:{item.umd}</Text> 
        </View>
      )}
    />
  );
};

export default ArduinoList;
