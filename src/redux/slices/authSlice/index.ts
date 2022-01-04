import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseType } from 'graphql/types';

export interface AuthStoreState {
  authData: AuthResponseType | null;
  loading: boolean;
  isInitiallyLoaded: boolean;
  codeConfirmError: string | null;
  error: string | null;
  hasAccessToWizard: boolean;
}

const initialAuthState: AuthStoreState = {
  error: null,
  codeConfirmError: null,
  loading: false,
  authData: null,
  isInitiallyLoaded: false,
  hasAccessToWizard: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setAuthData(state: AuthStoreState, action: PayloadAction<AuthResponseType | null>) {
      state.authData = action.payload;
    },
    setError(state: AuthStoreState, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
    setCodeConfirmError(state: AuthStoreState, action: PayloadAction<string | null>) {
      state.codeConfirmError = action.payload;
      state.loading = false;
    },
    setLoading(state: AuthStoreState, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setInitiallyLoaded(state: AuthStoreState, action: PayloadAction<boolean>) {
      state.isInitiallyLoaded = action.payload;
    },
    toggleWizardAccess(state: AuthStoreState) {
      state.hasAccessToWizard = !state.hasAccessToWizard;
    },
    logout() {}
  }
});

export default authSlice.actions;
