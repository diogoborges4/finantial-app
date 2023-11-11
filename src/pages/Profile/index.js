import { useContext } from "react";
import Header from "../../components/Header";
import { AuthContext } from "../../contexts/auth";
import {
  Container,
  LogoutButton,
  LogoutText,
  Message,
  Name,
  NewLink,
  NewText,
} from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <Container>
      <Header title={"My profile"} />

      <Message>Welcome back!</Message>

      <Name numberOfLines={1}>{user && user.name}</Name>

      <NewLink onPress={() => navigation.navigate("Register")}>
        <NewText>Make Register</NewText>
      </NewLink>

      <LogoutButton onPress={() => signOut()}>
        <LogoutText>Logout</LogoutText>
      </LogoutButton>
    </Container>
  );
}
