import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DragItem } from "../DragItems";
import { findItemIndexById, moveItem } from "../utils/arrayutils";
import { RootState } from "./store";

type AppState = {
	list: List[]
	draggedItem?: DragItem | null
}
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
  list: [{
    id: "1",
    text: "ToDo",
    task: [],
  },
  {
    id: "2",
    text: "Đang Làm",
    task: [],
  },
  {
    id: "3",
    text: "Hoàn Thành",
    task: [],
  },],
	draggedItem: null
};

export const TaskSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    addNewList: (state, action: PayloadAction<List>) => {
      state.list.push(action.payload);
    },
    addNewTask: (state, action) => {
			const colIndex = state.list.findIndex(col => col.id === action.payload.colId)
			state.list[colIndex].task.push(action.payload.task)
		},
    setDraggedItem: (state, action) => {
      // state = {
      //   ...state,
      //   draggedItem: action.payload
      // }
      state.draggedItem = action.payload
    },
    moveColumn: (state, action) => {
      const hoverIndex = findItemIndexById(state.list, action.payload.hoverId);
      const draggedIndex = findItemIndexById(state.list, action.payload.draggedId)
      state.list = moveItem(state.list, hoverIndex, draggedIndex)
    }
  },
});

export const selectTaskList = (state: RootState): List[] => state.task.list;
export const selectDraggedStatus= (state: RootState) => state.task.draggedItem;

export const {addNewList, addNewTask, moveColumn, setDraggedItem} = TaskSlice.actions;

export default TaskSlice.reducer;
