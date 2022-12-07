import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [input, setInput] = useState<string>();
  const [nome, setNome] = useState<string>();

  const gravarNome = () => {
    setNome(input);
    alert("Salvo com sucesso!");
    Keyboard.dismiss();
  };

  useEffect(() => {
    AsyncStorage.getItem("nome").then((value) => value && setNome(value));
  }, []);

  useEffect(() => {
    nome && AsyncStorage.setItem("nome", nome);
  }, [nome]);

  return (
    <View style={styles.container}>
      <View style={styles.viewInput}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={(text) => setInput(text)}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity onPress={gravarNome}>
          <Text style={styles.botao}>+</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      <Text style={styles.nome}>{nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
  },
  viewInput: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    margin: 10,
  },
  botao: {
    backgroundColor: "#222",
    color: "#FFF",
    height: 40,
    padding: 10,
    marginLeft: 3,
    marginRight: 10,
  },
  nome: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 15,
  },
});
