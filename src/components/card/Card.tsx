import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { CardDragItem } from "../../DragItems";
import { deleteTask, editTaskName } from "../../store/task.slice";
import { CardContainer } from "../../styles";
import { useCardDrop, useItemDrag } from "../../utils/useDnD";
import ModalEdit from "../modal-edit/ModalEdit";

export type CardProps = {
  id: string;
  colId: string;
  text: string;
};

const Card = ({ id, colId, text }: CardProps) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const handleEditText = (text: string) => {
    dispatch(
      editTaskName({
        colId,
        id,
        newTaskName: text,
      })
    );
  };
  const handleDelete = () => {
    dispatch(
      deleteTask({
        colId,
        id,
      })
    );
  };

  const item: CardDragItem = {
    id,
    colId,
    text,
    type: "CARD",
  };

  const { drag, isDragging } = useItemDrag(item);
  const { drop } = useCardDrop(item);

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <CardContainer ref={ref} opacity={opacity}>
      {text}
      <ModalEdit
        typeItem="Thẻ"
        textVal={text}
        buttonVal="🖉"
        onEdit={handleEditText}
        onDelete={handleDelete}
      />
    </CardContainer>
  );
};

export default Card;
