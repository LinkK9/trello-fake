import { nanoid } from "nanoid";
import React from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../store/task.slice";
import { ColumnContainer, ColumnTitle } from "../../styles";
import AddNewItem from "../add-item/AddNewItem";

export type ColumnProps = {
	id: string;
  text: string;
};

const Column: React.FC<ColumnProps> = ({ id, text, children }) => {
	const dispatch = useDispatch()
	const handleAddTask = (text: string) => {
		dispatch(addNewTask({
			colId: id,
			task: {
				id: nanoid(),
				text: text,
			}
		}))
	}
  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem toggleButtonText="+ Add new task" onAdd={handleAddTask} dark />
    </ColumnContainer>
  );
};

export default Column;