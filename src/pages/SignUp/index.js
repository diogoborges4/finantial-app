import { ActivityIndicator, Text, View } from "react-native";
import {
  AreaInput,
  Background,
  Container,
  Input,
  SubmitButton,
  SubmitText,
} from "../SignIn/style";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignUp(params) {
  const { signUp, loadingAuth } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignUp(params) {
    if (name === "" || email === "" || password === "") {
      return;
    }

    signUp(email, password, name);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <AreaInput>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </AreaInput>

        <AreaInput>
          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </AreaInput>

        <SubmitButton onPress={handleSignUp}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : (
            <SubmitText>SignUp</SubmitText>
          )}
        </SubmitButton>
      </Container>
    </Background>
  );
}
