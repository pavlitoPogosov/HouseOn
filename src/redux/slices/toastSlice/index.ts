import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IToastTypes = 'success' | 'error';
export interface IToast {
  id: string;
  text: string;
  title?: string;
  type?: IToastTypes;
  disableManualDismiss?: boolean;
  dismissTimeout?: number;
  appearTimeout?: number;
  preserveOnRouteChangeLimit?: number | boolean;
  animationDuration?: number;
  className?: string;
  renderContent?: (options: IToastRenderOptions) => React.ReactNode;
}

type IToastRenderOptions = {
  toast: IToast;
  onClose: () => void;
};

export interface ToastSliceState {
  activeToasts: IToast[];
  previousPathname: string;
}

const initialState: ToastSliceState = {
  activeToasts: [],
  previousPathname: ''
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast(state: ToastSliceState, action: PayloadAction<IToast>) {
      state.activeToasts.push(action.payload);
    },
    deleteToast(state: ToastSliceState, action: PayloadAction<string>) {
      state.activeToasts = state.activeToasts.filter((t) => t.id !== action.payload);
    },
    deleteAllToasts(state: ToastSliceState) {
      state.activeToasts = [];
    },
    replaceAllToasts(state: ToastSliceState, action: PayloadAction<IToast[]>) {
      state.activeToasts = action.payload;
    },
    replaceSingleToast(state: ToastSliceState, action: PayloadAction<IToast>) {
      state.activeToasts = state.activeToasts.map((t) => (t.id === action.payload.id ? action.payload : t));
    },
    setPreviousPathname(state: ToastSliceState, action: PayloadAction<string>) {
      state.previousPathname = action.payload;
    }
  }
});

export default toastSlice.actions;
