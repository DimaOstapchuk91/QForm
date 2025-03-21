import { createSlice } from '@reduxjs/toolkit';
import {
  deleteQuestionnaires,
  getQuestionnaires,
  getQuestionnairesById,
} from './operations.js';

const initialState = {
  questionnaires: [],
  oneQuestionnaire: {},
  total: 0,
  pagination: {
    page: 1,
    perPage: 6,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoading: false,
  error: false,
};

const questionnairesSlice = createSlice({
  name: 'questionnaires',
  initialState,
  reducers: {
    setPage: (state, action) => {
      const newPage = action.payload;
      if (newPage >= 1 && newPage <= state.pagination.totalPages) {
        state.pagination.page = newPage;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getQuestionnaires.pending, state => {
        state.error = false;
        state.isLoading = true;
      })
      .addCase(getQuestionnaires.fulfilled, (state, action) => {
        const {
          data,
          page,
          perPage,
          totalPages,
          totalItems,
          hasNextPage,
          hasPreviousPage,
        } = action.payload;
        state.questionnaires = data;
        state.pagination = {
          page,
          perPage,
          totalPages,
          totalItems,
          hasNextPage,
          hasPreviousPage,
        };
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
      })
      .addCase(deleteQuestionnaires.fulfilled, (state, action) => {
        state.questionnaires = state.questionnaires.filter(
          item => item._id !== action.payload
        );
        state.isLoading = false;
      });
  },
});

export const { setPage } = questionnairesSlice.actions;

export const questionnairesReduser = questionnairesSlice.reducer;
