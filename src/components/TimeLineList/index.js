import { Alert, Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Container, IconView, Tipo, TipoText, ValorText } from "./style";

export default function TimeLineList({ data, deleteItem }) {
  function handleDeleteItem(params) {
    Alert.alert("Attention", "Are you sure you want to delete this record?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Continue",
        onPress: () => deleteItem(data.id),
      },
    ]);
  }

  return (
    <TouchableWithoutFeedback onLongPress={handleDeleteItem}>
      <Container>
        <Tipo>
          <IconView tipo={data.type}>
            <Icon
              name={data.type === "receita" ? "arrow-down" : "arrow-up"}
              size={20}
              color={"#fff"}
            />
            <TipoText>{data.type}</TipoText>
          </IconView>
        </Tipo>

        <ValorText>R$ {data.value}</ValorText>
      </Container>
    </TouchableWithoutFeedback>
  );
}
