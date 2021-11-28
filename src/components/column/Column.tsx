import { nanoid } from "nanoid";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { ColumnDragItem } from "../../DragItems";
import {
  addNewTask,
  moveColumn,
  selectDraggedStatus,
  setDraggedItem,
} from "../../store/task.slice";
import { ColumnContainer, ColumnTitle } from "../../styles";
import AddNewItem from "../add-item/AddNewItem";

export type ColumnProps = {
  id: string;
  text: string;
};

const Column: React.FC<ColumnProps> = ({ id, text, children }) => {
  const dispatch = useDispatch();
  const handleAddTask = (text: string) => {
    if (text === "") {
      return;
    }
    dispatch(
      addNewTask({
        colId: id,
        task: {
          id: nanoid(),
          text: text,
        },
      })
    );
  };

  const draggedItem = useSelector(selectDraggedStatus);
  const item: ColumnDragItem = {
    id,
    title: text,
    type: "COLUMN",
  };
  const [, drag] = useDrag(() => ({
    type: "COLUMN",
    item: () => {
      dispatch(setDraggedItem(item));
			return item
    },
    end: () => {
      dispatch(setDraggedItem(null));
    },
  }));

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover(){
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }
        dispatch(moveColumn({ hoverId: id, draggedId: draggedItem.id }));
      }
    },
  });

  const ref = useRef(null);

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {children}
      <AddNewItem toggleButtonText="+ Thêm thẻ" onAdd={handleAddTask} dark />
    </ColumnContainer>
  );
};

export default Column;
