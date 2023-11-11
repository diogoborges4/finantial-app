import { Text, TouchableWithoutFeedback, View } from "react-native";
import {
  ButtonFilter,
  ButtonFilterText,
  Container,
  ModalContent,
} from "./style";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { useState } from "react";

export default function CalendarModal({ setVisible, handleFilter }) {
  const [dateNow, setDateNow] = useState(new Date());
  const [markedDates, setMarkedDates] = useState({});

  function handleOnDayPress(date) {
    setDateNow(new Date(date.dateString));

    let marketDay = {};

    marketDay[date.dateString] = {
      selected: true,
      selectedColor: "#3b3dbf",
      textColor: "#fff",
    };

    setMarkedDates(marketDay);
  }

  function handleFilterDates() {
    handleFilter(dateNow);
    setVisible();
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{ flex: 1 }}></View>
      </TouchableWithoutFeedback>

      <ModalContent>
        <Calendar onDayPress={handleOnDayPress} markedDates={markedDates} />

        <ButtonFilter onPress={handleFilterDates}>
          <ButtonFilterText>Filter</ButtonFilterText>
        </ButtonFilter>
      </ModalContent>
    </Container>
  );
}
