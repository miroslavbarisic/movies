import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Dispatch } from 'react';

interface State {
  data: null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState = {
  data: null,
  loading: 'idle',
} as State;

export const validationReducer = createSlice({
  initialState,
  name: 'validation',
  reducers: {
    clearValidation: (state: State) => {
      state.data = null;
      state.loading = 'succeeded';
    },

    setValidation: (state: State, action: PayloadAction<any>) => {
      state.data = action.payload;
      state.loading = 'succeeded';
    },
  },
});

export const setValidationFunc =
  (response: any) => async (dispatch: Dispatch<any>) => {
    dispatch(setValidation(response));
  };

export const clearValidationFunc = () => async (dispatch: Dispatch<any>) => {
  dispatch(clearValidation());
};

// Action creators are generated for each case reducer function
export const { setValidation, clearValidation } = validationReducer.actions;
export const validation = (state: any) => state.validation;
export default validationReducer.reducer;
