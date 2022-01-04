// eslint-disable-next-line
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EChatLanguagesTypes } from 'routes/chat/types';

export type TUserSliceState = {
  chatsLanguage: EChatLanguagesTypes;
  language: EChatLanguagesTypes;
};

export const userInitialState: TUserSliceState = {
  chatsLanguage: EChatLanguagesTypes.EN,
  language: EChatLanguagesTypes.EN
};

export const userSlice = createSlice({
  initialState: userInitialState,
  name: 'user',
  reducers: {
    setUserChatsLanguage: (state: TUserSliceState, action: PayloadAction<EChatLanguagesTypes>) => {
      state.chatsLanguage = action.payload;
    },

    setUserLanguage: (state: TUserSliceState, action: PayloadAction<EChatLanguagesTypes>) => {
      state.language = action.payload;
    }
  }
});

export const { setUserChatsLanguage, setUserLanguage } = userSlice.actions;

export default userSlice.actions;
