import { nanoid } from "nanoid";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNewItem from "./components/add-item/AddNewItem";
import Card from "./components/card/Card";
import Column from "./components/column/Column";
import { addNewList, selectTaskList } from "./store/task.slice";
import { AppContainer } from "./styles";

function App() {
  const taskList = useSelector(selectTaskList);
  const dispatch = useDispatch();
  const handleAddList = (tittle: string) => {
    dispatch(addNewList({
      id: nanoid(),
      text: tittle,
      task: [],
    }))
  }
  return (
    <AppContainer>
      {taskList.map((list) => (
        <Column text={list.text} id={list.id} key={list.id}>
          {list.task.map((task) => (
            <Card key={task.id} text={task.text} />
          ))}
        </Column>
      ))}
      <AddNewItem toggleButtonText="+ Add new List" onAdd={handleAddList} />
    </AppContainer>
  );
}

export default App;
