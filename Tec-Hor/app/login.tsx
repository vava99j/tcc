import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/src/style/style";
import axios from 'axios';
import { useId } from '../src/services/zustand/UserIdZustand'

// 👉 Troque pelo IP da sua máquina ou URL do Railway
const API_URL = "http://localhost:17928";

export default function LoginScreen() {
  const router = useRouter();
  const [criartelefone, setCriarTelefone] = useState("");
  const [criarsenha, setCriarSenha] = useState("");
  const [visible, setVisible] = useState(true);    // formulário visível
  const [visible2, setVisible2] = useState(false); // segundo view escondido
  const [visible3, setVisible3] = useState(false);
  const [entrarTel , setEntrarTel] = useState("");
  const [entrarSenha , setEntrarSenha] = useState("");
  const { setId } = useId();
  // Navegar para a Home
  function navigateToHome() {
    router.push("/(tabs)");
  }

  // Cadastrar usuário
  async function handleCadastro() {
    if (!criartelefone || !criarsenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefone: criartelefone,
          senha_hash: criarsenha,
        }),});
      if (!res.ok) throw new Error("Erro ao cadastrar usuário");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
    }
    setCriarTelefone('')
    setCriarSenha('')
      setVisible(false);  // esconde formulário
      setVisible2(true); 
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

    // supondo que o backend retorne { id: "123", ... }
    setId(response.data.id);

    Alert.alert("Sucesso", "Login realizado!");
    navigateToHome();
  setEntrarTel('')
  setEntrarSenha('')
  setVisible2(false);
  setVisible3(true);
  } catch (err) {
    console.error(err);
    Alert.alert("Erro", "Falha ao fazer login");
  }

}

async function toGoLogin() {
  setVisible(false)
  setVisible2(true)
}
  return (
   
    <View style={styles.container}>
       <View style={styles.separator}/>
      {/* Voltar */}
      <TouchableOpacity onPress={navigateToHome}>
        <Text>◀ Voltar</Text>
      </TouchableOpacity>

      {/* Formulário de cadastro */}
      {visible && 
        <View style={styles.planta}>
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
            onChangeText={setCriarSenha}
          />
          <TouchableOpacity onPress={handleCadastro}>
            <Text style={styles.button}>CRIAR CONTA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toGoLogin}>
            <Text>Ja possuo uma conta</Text>
          </TouchableOpacity>
        </View>
      }

      {/* Segundo View após cadastro */}
     {visible2 && 
  <View style={styles.planta}>
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
    <TouchableOpacity onPress={handleLogin}>
      <Text style={styles.button}>ENTRAR</Text>
    </TouchableOpacity>
  </View>
}

      {visible3 && 
        <View>
             <TouchableOpacity onPress={async () => { setId(''); navigateToHome(); }}>
            <Text style={styles.button}>SAIR</Text>
          </TouchableOpacity>
        </View>


      }


      <View style={styles.separator}></View>
    </View>
  );
}
