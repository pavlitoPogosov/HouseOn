import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountType } from 'graphql/types';

export interface AccountsStoreState {
  availableAccounts: AccountType[] | null;
  currentAccountId: string | null;
  currentHouseId: string | null;
}

const initialAuthState: AccountsStoreState = {
  availableAccounts: null,
  currentAccountId: null,
  currentHouseId: null
};

export const accountSlice = createSlice({
  name: 'accounts',
  initialState: initialAuthState,
  reducers: {
    setCurrentAccountId(state: AccountsStoreState, action: PayloadAction<string | null>) {
      state.currentAccountId = action.payload;
    },
    setCurrentHouseId(state: AccountsStoreState, action: PayloadAction<string | null>) {
      state.currentHouseId = action.payload;
    },
    setAvailableAccounts(state: AccountsStoreState, action: PayloadAction<AccountType[] | null>) {
      state.availableAccounts = action.payload;
    },
    addNewAccount(state: AccountsStoreState, action: PayloadAction<AccountType>) {
      state.availableAccounts = [...(state.availableAccounts || []), action.payload];
    }
  }
});

export default accountSlice.actions;
