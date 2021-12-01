import { nanoid } from "nanoid";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ColumnDragItem } from "../../DragItems";
import {
  addNewTask,
  deleteColumn,
  editTitleColumn,
} from "../../store/task.slice";
import { ColumnContainer, ColumnTitle } from "../../styles";
import { useItemDrag, useColumnDrop } from "../../utils/useDnD";
import AddNewItem from "../add-item/AddNewItem";
import ModalEdit from "../modal-edit/ModalEdit";

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

  const handleEditTitle = (text: string) => {
    dispatch(
      editTitleColumn({
        colId: id,
        newTitle: text,
      })
    );
  };

  const handleDeleteColumn = () => {
    dispatch(deleteColumn({ id }));
  };

  const item: ColumnDragItem = {
    id,
    title: text,
    type: "COLUMN",
  };
  const ref = useRef(null);

  const { drag, isDragging } = useItemDrag(item);
  const { drop } = useColumnDrop(item);

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref} opacity={opacity}>
      <ColumnTitle>
        {text}
        <ModalEdit
          typeItem="Danh sách"
          textVal={text}
          buttonVal="⋯"
          onEdit={handleEditTitle}
          onDelete={handleDeleteColumn}
        />
      </ColumnTitle>
      {children}
      <AddNewItem toggleButtonText="+ Thêm thẻ" onAdd={handleAddTask} dark />
    </ColumnContainer>
  );
};

export default Column;
