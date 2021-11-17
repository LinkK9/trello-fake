import React from "react";
import AddNewItem from "./components/add-item/AddNewItem";
import Card from "./components/card/Card";
import Column from "./components/column/Column";
import { AppContainer } from "./styles";



function App() {
  return (
    <AppContainer>
      <Column text="To Do">
        <Card text="Hoàn thành pet project" />
      </Column>
      <Column text="Đang Làm">
        <Card text="Học typescript " />
        <Card text="Viết trello app " />
      </Column>
      <Column text="Hoàn Thành">
        <Card text="Tạo một repo mới " />
      </Column>
      <AddNewItem toggleButtonText="+ Add new List" onAdd={console.log} />
    </AppContainer>
  );
}

export default App;
