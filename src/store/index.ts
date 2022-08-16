import { configureStore } from "@reduxjs/toolkit";
import { user_reducer } from "./slices/user_slice";

export const store = configureStore({
  reducer: {
    user: user_reducer,
  },
});

export type App_dispatch = typeof store.dispatch;
export type Root_state = ReturnType<typeof store.getState>;
