import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { CardDragItem, ColumnDragItem, DragItem } from "../DragItems";
import {
  moveCard,
  moveColumn,
  selectDraggedStatus,
  selectTaskList,
  setDraggedItem,
} from "../store/task.slice";

export const useItemDrag = (item: DragItem) => {

  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => {
      dispatch(setDraggedItem(null));
    },
    collect: (monitor: any) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  }));

  return { drag, isDragging };
};

export const useColumnDrop = (item: ColumnDragItem) => {
  const draggedItem = useSelector(selectDraggedStatus);
  const listCol = useSelector(selectTaskList);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: ["COLUMN", "CARD"],
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === item.id) {
          return;
        }
        dispatch(moveColumn({ hoverId: item.id, draggedId: draggedItem.id }));
      } else {
        const task =
          listCol[listCol.findIndex((list) => list.id === item.id)].task;
        if (draggedItem.id === item.id) {
          return;
        }
        if (task.length) {
          return;
        }
        dispatch(
          moveCard({
            draggedItemId: draggedItem.id,
            hoverItemId: null,
            sourceColId: draggedItem.colId,
            targetColId: item.id,
          })
        );
        dispatch(setDraggedItem({ ...draggedItem, colId: item.id }));
      }
    },
  });

  return { drop };
};
export const useCardDrop = (item: CardDragItem) => {
  const draggedItem = useSelector(selectDraggedStatus);
  const dispatch = useDispatch();

  const [, drop] = useDrop({
    accept: item.type,
    hover() {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== item.type) {
        return;
      }
      if (draggedItem.id === item.id) {
        return;
      }
      dispatch(
        moveCard({
          draggedItemId: draggedItem.id,
          hoverItemId: item.id,
          sourceColId: draggedItem.colId,
          targetColId: item.colId,
        })
      );
      dispatch(setDraggedItem({ ...draggedItem, colId: item.colId }));
    },
  });

  return { drop };
};
