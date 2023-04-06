import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user";

const store = configureStore({
  reducer: { user: userSlice.reducer },
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
