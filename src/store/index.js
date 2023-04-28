import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";
import uiSlice from "./ui";

const store = configureStore({
  reducer: { user: userSlice.reducer, ui: uiSlice.reducer },
});

// Redux store durumunu kaydetme
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

// Redux store durumunu geri yükleme

export const getReduxState = () => {
  return JSON.parse(localStorage.getItem("reduxState"));
};

export default store;
