import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import {
  deleteQuestionnaires,
  getQuestionnaires,
  getQuestionnairesById,
  postQuestionnaire,
} from './operations.js';

const initialState = {
  questionnaires: [],
  total: 0,
  questionnaireAnswers: {
    step: 0,
    answers: {},
  },
  pagination: {
    page: 1,
    perPage: 6,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  oneQuestionnaire: false,
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
    setQuestionnaireAnswers: (state, action) => {
      state.questionnaireAnswers = action.payload;
    },
    clearStateQuestionareAnwers: state => {
      state.questionnaireAnswers = initialState.questionnaireAnswers;
      state.isLoading = false;
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder
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
      .addCase(getQuestionnairesById.fulfilled, (state, action) => {
        state.oneQuestionnaire = action.payload;
      })
      .addCase(deleteQuestionnaires.fulfilled, (state, action) => {
        state.questionnaires = state.questionnaires.filter(
          item => item._id !== action.payload
        );
      })
      .addMatcher(
        isAnyOf(
          getQuestionnaires.pending,
          deleteQuestionnaires.pending,
          getQuestionnairesById.pending,
          postQuestionnaire.pending
        ),
        state => {
          state.isLoading = true;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getQuestionnaires.fulfilled,
          deleteQuestionnaires.fulfilled,
          getQuestionnairesById.fulfilled,
          postQuestionnaire.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = false;
        }
      )
      .addMatcher(
        isAnyOf(
          getQuestionnaires.rejected,
          deleteQuestionnaires.rejected,
          getQuestionnairesById.rejected,
          postQuestionnaire.rejected
        ),
        state => {
          state.isLoading = false;
          state.error = true;
        }
      );
  },
});

export const {
  setPage,
  clearState,
  setQuestionnaireAnswers,
  clearStateQuestionareAnwers,
} = questionnairesSlice.actions;

export const questionnairesReduser = questionnairesSlice.reducer;
