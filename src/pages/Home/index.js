import { useContext, useEffect, useState } from "react";
import { Button, Modal, Text, View } from "react-native";
import { AuthContext } from "../../contexts/auth";
import { Area, Background, List, ListBalance, Title } from "./styles";
import Header from "../../components/Header";
import { format } from "date-fns";
import api from "../../services/api";
import { useIsFocused } from "@react-navigation/native";
import BalanceItem from "../../components/BalanceItem";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import TimeLineList from "../../components/TimeLineList";
import CalendarModal from "../../components/CalendarModal";

export default function Home() {
  const [listBalance, setListBalance] = useState([]);
  const [movements, setMovements] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dateFormated = format(dateMovements, "dd/MM/yyyy");

      const balance = await api.get("/balance", {
        params: {
          date: dateFormated,
        },
      });

      const receives = await api.get("/receives", {
        params: {
          date: dateFormated,
        },
      });

      if (isActive) {
        setListBalance(balance.data);
        setMovements(receives.data);
      }
    }

    getMovements();

    return () => (isActive = false);
  }, [isFocused, dateMovements]);

  async function handleDelete(id) {
    try {
      await api.delete("/receives/delete", {
        params: {
          item_id: id,
        },
      });

      setDateMovements(new Date());
    } catch (error) {
      console.log(error);
    }
  }

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected);
  }

  return (
    <Background>
      <Header title="My transactions" />

      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.tag}
        renderItem={({ item }) => <BalanceItem data={item} />}
      />

      <Area>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="event" color="#121212" size={30} />
        </TouchableOpacity>
        <Title>Latest movements</Title>
      </Area>

      <List
        data={movements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimeLineList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </Background>
  );
}
