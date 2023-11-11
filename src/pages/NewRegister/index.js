import { Background, Input, SubmitButton, SubmitText } from "./styles";
import Header from "../../components/Header";
import api from "../../services/api";
import { format } from "date-fns";
import {
  Alert,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import RegisterType from "../../components/RegisteType";
import { useNavigation } from "@react-navigation/native";

export default function NewRegister() {
  const navigation = useNavigation();
  const [labelInput, setLabelInput] = useState("");
  const [valueInput, setValueInput] = useState("");
  const [type, setType] = useState("receita");

  function handleSubmit(params) {
    Keyboard.dismiss();

    if (isNaN(parseFloat(valueInput)) || type === null) {
      alert("Preencha todos os campos");
      return;
    }

    Alert.alert(
      "Confirming data",
      `Type: ${type} - Value: ${parseFloat(valueInput)}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => handleAdd(),
        },
      ]
    );
  }

  async function handleAdd(params) {
    Keyboard.dismiss();

    await api.post("/receive", {
      description: labelInput,
      value: Number(valueInput),
      type: type,
      date: format(new Date(), "dd/MM/yyy"),
    });

    setLabelInput("");
    setValueInput("");

    navigation.navigate("Home");
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Header title={"Register"} />

        <SafeAreaView style={{ marginTop: 14, alignItems: "center" }}>
          <Input
            placeholder="Description of register"
            value={labelInput}
            onChangeText={(text) => setLabelInput(text)}
          />
          <Input
            placeholder="Desired value"
            keyboardType="numeric"
            value={valueInput}
            onChangeText={(text) => setValueInput(text)}
          />

          <RegisterType type={type} sendTypeChanged={(item) => setType(item)} />

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Register</SubmitText>
          </SubmitButton>
        </SafeAreaView>
      </Background>
    </TouchableWithoutFeedback>
  );
}
