import { useNavigation } from "@react-navigation/native";
import { ButtonMenu, Container, Title } from "./styles";
import Icon from "react-native-vector-icons/Feather";

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <Container>
      <ButtonMenu onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={35} color={"#121212"} />
      </ButtonMenu>

      {title && <Title>{title}</Title>}
    </Container>
  );
}
