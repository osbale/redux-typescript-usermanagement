import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Form {
  id: string;
  name: string;
  lastname: string;
  address: string;
  email: string;
}

const initialState: FormState = {
  status: "idle",
  value: [],
};

export interface FormState {
  status: "idle" | "loading" | "failed";
  value: Form[];
}

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    remove: (state, action: PayloadAction<string[]>) => {
      state.value = state.value.filter(
        (form) => !action.payload.includes(form.id)
      );
    },
    update: (state, action: PayloadAction<Form>) => {
      state.value = state.value.map((form) =>
        form.id === action.payload.id ? action.payload : form
      );
    },
  },
});

export const { add, remove, update } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
