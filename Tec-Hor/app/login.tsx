import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/src/style/style';
// URL base da sua API
// Para testes no seu computador, use o seu IP de rede local
// ou a URL do Railway após a implantação
const API_URL = 'http://192.168.0.110:3000'; // Exemplo: 'http://192.168.1.5:3000'

export default function LoginScreen() {
  const router = useRouter();
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarioIdParaExcluir, setUsuarioIdParaExcluir] = useState('');

  // Função para navegar para a tela principal
  async function navigateToHome() {
    router.push("/(tabs)");
  }

  // Função para lidar com o cadastro de um novo usuário
  async function handleCadastro() {
    try {
      if (!telefone || !senha) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }

      const response = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telefone, senha }),
       
      });
      const data = await response.json();

      if (response.status === 201) { // Status 201 geralmente indica que algo foi criado
        Alert.alert("Sucesso", "Usuário cadastrado!");
        // Opcional: navegar para outra tela ou limpar os campos
      } else {
        Alert.alert("Erro", data.error || "Ocorreu um erro no cadastro.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    }
  }

  // Função para lidar com a exclusão de um usuário
  async function handleExclusao() {
    try {
      if (!usuarioIdParaExcluir) {
        Alert.alert("Erro", "Por favor, digite o ID do usuário a ser excluído.");
        return;
      }

      const response = await fetch(`${API_URL}/usuarios/${usuarioIdParaExcluir}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", `Usuário com ID ${usuarioIdParaExcluir} excluído.`);
      } else {
        const data = await response.json();
        Alert.alert("Erro", data.error || "Usuário não encontrado ou erro na exclusão.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      Alert.alert("Erro de Conexão", "Não foi possível conectar ao servidor.");
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToHome}>
        <Text>◀ voltar</Text>
      </TouchableOpacity>
      
      <View style={styles.planta}>
        <Text>Telefone</Text>
        <TextInput 
          style={styles.input} 
          keyboardType='numeric' 
          value={telefone} 
          onChangeText={setTelefone}
        />
        <Text>Senha</Text>
        <TextInput 
          style={styles.input} 
          secureTextEntry
          value={senha} 
          onChangeText={setSenha}
        />
        <TouchableOpacity onPress={handleCadastro}>
          <Text style={styles.button}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.separator}></View>

      <View style={styles.planta}>
        <Text>ID do Usuário para Excluir</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={usuarioIdParaExcluir}
          onChangeText={setUsuarioIdParaExcluir}
        />
        <TouchableOpacity onPress={handleExclusao}>
          <Text style={styles.button}>Excluir Usuário</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}