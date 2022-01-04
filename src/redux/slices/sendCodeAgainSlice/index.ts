import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SendCodeAgainState {
  cooldown: number | null;
}

const initialSendCodeAgain: SendCodeAgainState = {
  cooldown: null
};

export const sendCodeAgainSlice = createSlice({
  name: 'house',
  initialState: initialSendCodeAgain,
  reducers: {
    setCooldown(state: SendCodeAgainState, action: PayloadAction<number | null>) {
      state.cooldown = action.payload;
    }
  }
});

export default sendCodeAgainSlice.actions;
