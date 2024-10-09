import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IReminderState {
  reminder: boolean;
};

const initialState: IReminderState = {
  reminder: false,
};

const remindersSlice = createSlice({
  name: "reminders",
  initialState,
  reducers: {
    setReminder: (state, action: PayloadAction<boolean>) => {
      state.reminder = action.payload;
    },
  },
});

export const { 
  setReminder
} = remindersSlice.actions;

export default remindersSlice.reducer;