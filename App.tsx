import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Modal,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [input, setInput] = useState<string>();
  const [nome, setNome] = useState<string>();
  const [modal, setModal] = useState<boolean>(false);

  const gravarNome = () => {
    setNome(input);
    Keyboard.dismiss();
    setModal(true);
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

      <Modal animationType="slide" visible={modal} transparent={true}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <View
            style={{
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              backgroundColor: "#FFF",
              opacity: 1,
              flex: 1,
              justifyContent: "center",
              alignItems: "stretch",
              padding: 20,
            }}
          >
            <Text style={styles.nome}>{nome}</Text>
            <Button title="Sair" onPress={() => setModal(false)}></Button>
          </View>
        </View>
      </Modal>
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
