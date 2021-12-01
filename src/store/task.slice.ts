import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDragItem, ColumnDragItem } from "../DragItems";
import { findItemIndexById, moveItem } from "../utils/arrayutils";
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
      task: [
        { id: "jsdgfads", text: "Master ReactJs" },
      ],
    },
    {
      id: "2",
      text: "Đang Làm",
      task: [
        { id: "jswdfads", text: "Học React" },
        { id: "jsfads", text: "Học TypeScript" },
      ],
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

    editTitleColumn: (state, action) => {
      const {colId, newTitle} = action.payload
      const index = findItemIndexById(state.list, colId)
      state.list[index].text = newTitle
    },

    deleteColumn: (state, action) => {
      const index = findItemIndexById(state.list, action.payload.id)
      state.list.splice(index, 1);
    },

    editTaskName: (state, action) => {
      const {colId, id, newTaskName} = action.payload
      const colIndex = findItemIndexById(state.list, colId)
      const cardIndex = findItemIndexById(state.list[colIndex].task, id)
      state.list[colIndex].task[cardIndex].text = newTaskName
    },

    deleteTask: (state, action) => {
      const {colId, id} = action.payload
      const colIndex = findItemIndexById(state.list, colId)
      const cardIndex = findItemIndexById(state.list[colIndex].task, id)
      state.list[colIndex].task.splice(cardIndex, 1)
    },
  },
});

export const selectTaskList = (state: RootState): List[] => state.list;
export const selectDraggedStatus = (state: RootState) => state.draggedItem;

export const {
  addNewList,
  addNewTask,
  moveColumn,
  setDraggedItem,
  moveCard,
  editTitleColumn,
  deleteColumn,
  editTaskName,
  deleteTask,
} = TaskSlice.actions;

export default TaskSlice.reducer;
