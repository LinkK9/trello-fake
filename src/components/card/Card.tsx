import React, { useRef } from "react";
import { CardDragItem } from "../../DragItems";
import { CardContainer } from "../../styles";
import { useCardDrop, useItemDrag } from "../../utils/useDnD";

export type CardProps = {
  id: string;
  colId: string;
  text: string;
};
const Card = ({ id, colId, text }: CardProps) => {
  const ref = useRef(null);
  const item: CardDragItem = {
    id,
		colId,
    text,
    type: "CARD",
  };
  const { drag } = useItemDrag(item);
  const { drop } = useCardDrop(item);
  drag(drop(ref));
  return <CardContainer ref={ref}>{text}</CardContainer>;
};

export default Card;
