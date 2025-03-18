import { createSlice } from '@reduxjs/toolkit';
import { getQuestionnaires, getQuestionnairesById } from './operations.js';

const initialState = {
  questionnaires: [],
  total: 0,
  page: 1,
  params: '',
  oneQuestionnaire: {},
  isLoading: false,
  error: false,
};

const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getQuestionnaires.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(getQuestionnaires.fulfilled, (state, action) => {
        state.oneQuestionnaire = action.payload;
      })
      .addCase(getQuestionnaires.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getQuestionnairesById.fulfilled, (state, action) => {
        state.oneQuestionnaire = action.payload;
        state.isLoading = false;
      })
      .addCase(getQuestionnairesById.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(getQuestionnairesById.rejected, state => {
        state.isLoading = false;
        state.error = true;
      });
  },
});

export const questionnairesReduser = questionnairesSlice.reducer;
