import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SessionPayload } from "./lib/session";

interface UserState {
  user?: SessionPayload;
}

const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState["user"]>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
