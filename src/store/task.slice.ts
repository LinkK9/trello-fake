import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDragItem, ColumnDragItem, DragItem } from "../DragItems";
import {
  findItemIndexById,
  insertItemAtIndex,
  moveItem,
  removeItemAtIndex,
} from "../utils/arrayutils";
import { RootState } from "./store";

type AppState = {
  list: List[];
  draggedItem?: CardDragItem | ColumnDragItem | null;
};
type List = {
  id: string;
  text: string;
  task: Task[];
};

type Task = {
  id: string;
  text: string;
};
const initialState: AppState = {
  list: [
    {
      id: "1",
      text: "ToDo",
      task: [],
    },
    {
      id: "2",
      text: "Đang Làm",
      task: [{id: 'jsdgfads', text: '1'},{id: 'jsfads', text: '2'},{id: 'jasd2sfads', text: '3'} ],
    },
    {
      id: "3",
      text: "Hoàn Thành",
      task: [],
    },
  ],
  draggedItem: null,
};

export const TaskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addNewList: (state, action: PayloadAction<List>) => {
      state.list.push(action.payload);
    },
    addNewTask: (state, action) => {
      const colIndex = state.list.findIndex(
        (col) => col.id === action.payload.colId
      );
      state.list[colIndex].task.push(action.payload.task);
    },
    setDraggedItem: (state, action) => {
      state.draggedItem = action.payload;
    },
    moveColumn: (state, action) => {
      const hoverIndex = findItemIndexById(state.list, action.payload.hoverId);
      const draggedIndex = findItemIndexById(
        state.list,
        action.payload.draggedId
      );
      state.list = moveItem(state.list, hoverIndex, draggedIndex);
    },
    moveCard: (state, action) => {
      const { draggedItemId, hoverItemId, sourceColId, targetColId } =
        action.payload;
      const sourceListIndex = findItemIndexById(state.list, sourceColId);
      const targetListIndex = findItemIndexById(state.list, targetColId);
      const dragItemIndex = findItemIndexById(
        state.list[sourceListIndex].task,
        draggedItemId
      );

      // Kiểm tra nếu cột đến chưa có thẻ nào thì cho target = 0
      const hoverItemIndex = hoverItemId
        ? findItemIndexById(state.list[targetListIndex].task, hoverItemId)
        : 0;

      const item = state.list[sourceListIndex].task[dragItemIndex];
      // Xóa thẻ ở cột ban đầu
      state.list[sourceListIndex].task.splice(dragItemIndex, 1);
      // Chèn thẻ vào cột target
      state.list[targetListIndex].task.splice(hoverItemIndex, 0, item);
    },
  },
});

export const selectTaskList = (state: RootState): List[] => state.task.list;
export const selectDraggedStatus = (state: RootState) => state.task.draggedItem;

export const { addNewList, addNewTask, moveColumn, setDraggedItem, moveCard } =
  TaskSlice.actions;

export default TaskSlice.reducer;
