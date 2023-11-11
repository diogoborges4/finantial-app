import { ActivityIndicator, Platform, Text, View } from "react-native";
import {
  AreaInput,
  Background,
  Container,
  Input,
  Link,
  LinkText,
  Logo,
  SubmitButton,
  SubmitText,
} from "./style";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";

export default function SignIn(params) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, loadingAuth } = useContext(AuthContext);

  function handleLogin() {
    signIn(email, password);
  }

  return (
    <Background>
      <Container behavior={Platform.OS === "ios" ? "padding" : ""} enabled>
        <Logo source={require("../../Assets/Logo.png")} />

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

        <SubmitButton activeOpacity={0.8} onPress={handleLogin}>
          {loadingAuth ? (
            <ActivityIndicator size={20} color={"#fff"} />
          ) : (
            <SubmitText>Login</SubmitText>
          )}
        </SubmitButton>

        <Link onPress={() => navigation.navigate("SignUp")}>
          <LinkText>Create Account</LinkText>
        </Link>
      </Container>
    </Background>
  );
}
