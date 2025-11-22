import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, Pressable } from 'react-native';
import { suporteSite } from '@/src/services/site';
import { useThemedStyles } from '@/src/style/style';
import axios from 'axios';
import { useId } from '../src/services/zustand/UserIdZustand';
import DataArduino from '../src/screen/dataArduino';
import { navigateToHome } from '@/src/services/navigate';
import { MaterialIcons } from '@expo/vector-icons';
import BtnTH from '../src/.minecraft/btnth'
const API_URL = "https://servidor-632w.onrender.com";



export default function LoginScreen() {
  const styles = useThemedStyles();
  const [criartelefone, setCriarTelefone] = useState("");
  const [criarsenha, setCriarSenha] = useState("");
  const [cod_ard, setCodArd] = useState("");
  const [visible, setVisible] = useState(true);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [entrarTel, setEntrarTel] = useState("");
  const [entrarSenha, setEntrarSenha] = useState("");
  const [horarios, setHorarios] = useState("");
  const { id, setId } = useId();

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

  const handleArd = async () => {
    console.log("Tentando atualizar Arduino com código:", cod_ard);
    try {
      const response = await axios.patch(`${API_URL}/arduinos/${cod_ard}`, {
        usuario_id: Number(id),
        horarios: horarios,
      });

      Alert.alert('Sucesso', response.data.message || 'Arduino atualizado!');
      navigateToHome();
    } catch (error: any) {
      console.error('Erro ao atualizar Arduino:', error);
      Alert.alert(
        'Erro',
        error.response?.data?.error || 'Não foi possível atualizar o Arduino.'
      );
    }
  };

  async function toGoLogin() {
    setVisible(false);
    setVisible2(true);
  }

  return (
    <View style={styles.containerL}>
      <View style={styles.separatorL} />

      <TouchableOpacity onPress={navigateToHome}>
        <Text style={styles.txt}><MaterialIcons name="keyboard-arrow-left" />Voltar</Text>
      </TouchableOpacity>

      <View style={styles.separator} />
      {!id && visible && (
        <View style={styles.planta}>
          <View style={styles.separatorL} />

          <Text style={styles.txt}>Telefone</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={criartelefone}
            onChangeText={setCriarTelefone}
          />

          <Text style={styles.txt}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={criarsenha}
            onChangeText={setCriarSenha}
          />

          <View style={styles.separatorL} />
          <BtnTH label="CRIAR CONTA" onPress={handleCadastro} />

          <Pressable onPress={toGoLogin}>
            <Text style={styles.txtg}>Já possuo uma conta</Text>
          </Pressable>
        </View>
      )}
      {!id && visible2 && (
        <View style={styles.planta}>
          <View style={styles.separatorL} />
          <Text style={styles.txt}>Telefone</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={entrarTel}
            onChangeText={setEntrarTel}
          />
          <Text style={styles.txt}>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={entrarSenha}
            onChangeText={setEntrarSenha}
          />
          <View style={styles.separatorL} />
          <BtnTH label="ENTRAR" onPress={handleLogin} />
          <Pressable
            onPress={suporteSite}>
            <Text style={styles.txtg}>Esqueci a senha</Text>
          </Pressable>
        </View>
      )}
      {id && (

        <View style={styles.planta}>
          <View style={styles.separator} />

          <Pressable
            onPress={async () => {
              setId('');
              navigateToHome();
            }}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'red' : '',
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                alignItems: 'center',
                marginTop: 10,
                borderColor: pressed ? 'black' : 'green',
                borderWidth: 2,
              },
            ]}
          >
            <Text style={styles.txt}>encerrar sessão</Text>
          </Pressable>
          <DataArduino />
          <Text style={styles.txt}>{'\n'}Código do Arduino</Text>
          <TextInput
            style={styles.input}
            value={cod_ard}
            onChangeText={setCodArd}
          />
          <Text style={styles.txt} >Horários Planta</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={horarios}
            onChangeText={setHorarios}
          />
          <BtnTH label="ENVIAR" onPress={handleArd} />
          <View style={styles.separator} />
          <View style={styles.separator} />
          <View style={styles.separator} />
        </View>
      )}
      <View style={styles.separator} />
    </View>
  );
}
