import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  tasks: [],
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },

    setTasks: (state, action) => {
      console.log(state);
      console.log("action", action);
      state.tasks = [...state.tasks, action.payload.tasks];
    },

    // deleteTask:(state, action)=>{
    //   state.task =
    // }

    taskObjDelete: (state, action) => {
      state.tasks = state.tasks.filter(
        (ele, index) => index !== action.payload.id
      );
      return state;
    },
    taskObjUpdate: (state, action) => {
      state.tasks = state.tasks.map((ele, index) => {
        if (index === action.payload.id) {
          return { ...ele, ...action.payload.updatedData };
        }
        return ele;
      });
      return state;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setTasks,
  setTask,
  taskObjDelete,
  taskObjUpdate,
} = authSlice.actions;
export default authSlice.reducer;
