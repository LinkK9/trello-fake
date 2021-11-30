import { nanoid } from "nanoid";
import React from "react";
import { useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { addNewList, selectTaskList } from "../../store/task.slice";
import { AppContainer } from "../../styles";
import AddNewItem from "../add-item/AddNewItem";
import Card from "../card/Card";
import Column from "../column/Column";

const Home: React.FC = () => {
  const taskList = useSelector(selectTaskList);
  const dispatch = useDispatch();
  const handleAddList = (title: string) => {
    if (title === "") {
      return;
    }
    dispatch(
      addNewList({
        id: nanoid(),
        text: title,
        task: [],
      })
    );
  };

  const [ , drop] = useDrop(() => ({
    accept: 'COLUMN',
    
  }))

  return (
    <AppContainer ref={drop}>
      {taskList.map((list) => (
        <Column text={list.text} id={list.id} key={list.id}>
          {list.task.map((task) => (
            <Card key={task.id} id={task.id} colId={list.id} text={task.text} />
          ))}
        </Column>
      ))}
      <AddNewItem toggleButtonText="+ Thêm danh sách khác " onAdd={handleAddList} />
    </AppContainer>
  );
};

export default Home;
