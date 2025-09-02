import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import { styles } from "@/src/style/style";

// 👉 Troque pelo IP da sua máquina ou URL do Railway
const API_URL = "http://localhost:17928";

export default function LoginScreen() {
  const router = useRouter();
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [visible, setVisible] = useState(true);    // formulário visível
  const [visible2, setVisible2] = useState(false); // segundo view escondido

  // Navegar para a Home
  function navigateToHome() {
    router.push("/(tabs)");
  }

  // Cadastrar usuário
  async function handleCadastro() {
    if (!telefone || !senha) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefone: telefone,
          senha_hash: senha,
        }),
      });

      if (!res.ok) throw new Error("Erro ao cadastrar usuário");
      // Mostra alerta de sucesso e troca de view após clicar em OK
      Alert.alert(
        "Sucesso!",
        "Usuário cadastrado com sucesso.",
        [
          {
            text: "OK",
            onPress: () => {
              setVisible(false);  // esconde formulário
              setVisible2(true);  // mostra o segundo view
            },
          },
        ],
        { cancelable: false } // evita que o usuário feche o alerta sem clicar
      );

    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível cadastrar o usuário");
    }
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
      }

      {/* Segundo View após cadastro */}
      {visible2 && 
        <View style={styles.planta}>
          <Text>Cadastro concluído! 🎉</Text>
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
