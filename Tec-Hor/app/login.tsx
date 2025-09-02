import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/src/style/style";

// 👉 Troque pelo IP da sua máquina ou URL do Railway
const API_URL = "http://localhost:17928";

export default function LoginScreen() {
  const router = useRouter();
  const [Criartelefone, setTelefone] = useState("");
  const [Criarsenha, setSenha] = useState("");
  const [visible, setVisible] = useState(true);    // formulário visível
  const [visible2, setVisible2] = useState(false); // segundo view escondido

  // Navegar para a Home
  function navigateToHome() {
    router.push("/(tabs)");
  }

  // Cadastrar usuário
  async function handleCadastro() {
    if (!Criartelefone || !Criarsenha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefone: Criartelefone,
          senha_hash: Criarsenha,
        }),});
      if (!res.ok) throw new Error("Erro ao cadastrar usuário");
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
    }
    setTelefone('')
    setSenha('')
      setVisible(false);  // esconde formulário
              setVisible2(true); 
  }
async function handleLogin() {
  
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
            value={Criartelefone}
            onChangeText={setTelefone}
          />
          <Text>Senha</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={Criarsenha}
            onChangeText={setSenha}
          />
          <TouchableOpacity onPress={handleCadastro}>
            <Text style={styles.button}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      }

      {/* Segundo View após cadastro */}
      {visible2 && 
        <View style={styles.planta}>
          <View style={styles.separator}></View>
          <View style={styles.separator}></View>
          <View style={styles.separator}></View>
          <TouchableOpacity
            onPress={() => {
              setVisible2(false);
              setVisible(true); // opcional: voltar ao formulário
            }}
          >
            <Text style={styles.button}>LOGOUT</Text>
          </TouchableOpacity>
        </View>
      }

      <View style={styles.separator}></View>
    </View>
  );
}
