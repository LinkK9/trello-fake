import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

type AppState = {
	list: List[]
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
  },]
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
  },
});

export const selectTaskList = (state: RootState): List[] => state.task.list;

export const {addNewList, addNewTask} = TaskSlice.actions;

export default TaskSlice.reducer;
