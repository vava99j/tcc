import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/src/style/style";
import axios from 'axios';
import { useId } from '../src/services/zustand/UserIdZustand'


const API_URL = "https://servidor-632w.onrender.com";

export function navigateToHome() {
  const router = useRouter();
  router.push("/(tabs)");
}

export default function LoginScreen() {
  const [criartelefone, setCriarTelefone] = useState("");
  const [criarsenha, setCriarSenha] = useState("");
  const [cod_ard , setCodArd] = useState("");
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [entrarTel , setEntrarTel] = useState("");
  const [entrarSenha , setEntrarSenha] = useState("");
  const [horarios , setHorarios] = useState("")
  const { id,setId } = useId();
 
  async function handleCadastro() {
    if (!criartelefone || !criarsenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const res = await axios.post(`${API_URL}/usuarios`, {
        telefone: criartelefone,
        senha_hash: criarsenha,
      });

      if (res.status !== 201 && res.status !== 200) {
        throw new Error("Erro ao cadastrar usuário");
      }

      setCriarTelefone('');
      setCriarSenha('');
      setVisible(false);
      setVisible2(true);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
    }
  }

  

  async function handleLogin() {
    if (!entrarTel || !entrarSenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/login`, {
        telefone: entrarTel,
        senha_hash: entrarSenha,
      });

      setId(response.data.id);

      Alert.alert("Sucesso", "Login realizado!");
      navigateToHome();
      setEntrarTel('');
      setEntrarSenha('');
      setVisible2(false);
      setVisible3(true);
    } catch (err) {
      Alert.alert("Erro", "Falha ao fazer login");
    }
  }


  
const handleArd = async (cod_ard: string) => {
  console.log("Tentando atualizar Arduino com código:", cod_ard);
  try {
    const response = await axios.patch(`${API_URL}/arduinos/${cod_ard}`, {
      id_usuarios: id,
      horarios: horarios
    });

    Alert.alert('Sucesso', response.data.message);
  } catch (error: any) {
    console.error('Erro ao atualizar Arduino:', error);
    Alert.alert(
      'Erro',
      error.response?.data?.error || 'Não foi possível atualizar o Arduino.'
    );
  }
};


  async function toGoLogin() {
    setVisible(false)
    setVisible2(true)
  }


  
  return (
    <View style={styles.containerL}>
      <View style={styles.separatorL}/>
      <TouchableOpacity onPress={navigateToHome}>
        <Text>◀ Voltar</Text>
      </TouchableOpacity>
      <View style={styles.separator}/>

      {!id && visible && 
        <View style={styles.planta}>
      <View style={styles.separatorL}/>
          <Text>Telefone</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={criartelefone}
            onChangeText={setCriarTelefone}
          />
          <Text>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={criarsenha}
            onChangeText={setCriarSenha}/>
            <View style={styles.separatorL}/>
          <Pressable onPress={handleCadastro}
           style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#b0dca8' : 'green',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
                
              },
            ]}>
            <Text style={styles.txtW}>CRIAR CONTA</Text>
          </Pressable>
          <Pressable onPress={toGoLogin}>
            <Text>Já possuo uma conta</Text>
          </Pressable>
        </View>
      }

      {!id && visible2 && 
        <View style={styles.planta}>
          <View style={styles.separatorL}/>
          <Text>Telefone</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={entrarTel}
            onChangeText={setEntrarTel}
          />
          <Text>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={entrarSenha}
            onChangeText={setEntrarSenha}
          />
          <View style={styles.separatorL}/>
          <Pressable onPress={handleLogin}
          style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#b0dca8' : 'green',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
                
              },
            ]}>
            
            <Text style={styles.txtW}>ENTRAR</Text>
          </Pressable>
        </View>
      }

      {id &&  
        <View style={styles.planta}>
          <View style={styles.separator}/>
          <View style={styles.separator}/>
          <Pressable onPress={async () => { setId(''); navigateToHome(); }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'red' : 'white',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
                borderColor: pressed ? 'black' : 'green',
                borderWidth: 2
              },
            ]}>
            <Text>SAIR</Text>
          </Pressable>
          <View style={styles.separatorL}/>
         <Text> Codigo do Arduino </Text>
<TextInput
  style={styles.input}
  value={cod_ard}
  onChangeText={setCodArd}
/>

<Text> Nome Da Planta </Text>
<TextInput
  style={styles.input}
  value={horarios}
  onChangeText={setHorarios}
/>

<Pressable
  onPress={() => handleArd(cod_ard)} 
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
  <Text style={styles.txtW}>enviar</Text>
</Pressable>

        </View>
      }

      <View style={styles.separator}></View>
    </View>
  );
}
