import { nanoid } from "nanoid";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ColumnDragItem } from "../../DragItems";
import { addNewTask } from "../../store/task.slice";
import { ColumnContainer, ColumnTitle } from "../../styles";
import { useItemDrag, useColumnDrop } from "../../utils/useDnD";
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

  const item: ColumnDragItem = {
    id,
    title: text,
    type: "COLUMN",
		child: !!children
  };
  const ref = useRef(null);

  const { drag } = useItemDrag(item);
  const { drop } = useColumnDrop(item);

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
