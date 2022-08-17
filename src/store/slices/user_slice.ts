import { createSlice } from "@reduxjs/toolkit";
import { user_type } from "types";

const initial_state: user_type = {
  contacts: null,
  id: null,
  password: null,
  username: null,
  is_auth: false,
};

const user_slice = createSlice({
  name: "user",
  initialState: initial_state,
  reducers: {
    set_user(state, action) {
      const { payload } = action;

      state.contacts = payload.contacts;
      state.id = payload.id;
      state.password = payload.password;
      state.username = payload.username;
      state.is_auth = payload.is_auth;
    },
    remove_user(state) {
      state.contacts = null;
      state.id = null;
      state.password = null;
      state.username = null;
      state.is_auth = false;
    },
  },
});

export const { remove_user, set_user } = user_slice.actions;
export const user_reducer = user_slice.reducer;
