import { View } from "react-native";
import { Balance, Container, Label } from "./styles";
import { useMemo } from "react";

export default function BalanceItem({ data }) {
  const labelName = useMemo(() => {
    if (data.tag === "saldo") {
      return {
        label: "Current balance",
        color: "3b3dbf",
      };
    } else if (data.tag === "receita") {
      return {
        label: "Revenue",
        color: "00b94a",
      };
    } else {
      return {
        label: "Expenses",
        color: "ef463a",
      };
    }
  }, [data]);

  return (
    <Container bg={labelName.color}>
      <Label>{labelName.label}</Label>
      <Balance>R$ {data.saldo}</Balance>
    </Container>
  );
}
