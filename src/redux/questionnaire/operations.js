import { createAsyncThunk } from '@reduxjs/toolkit';
import { errToast, successfullyToast } from '../../utils/toast.js';
import { questionnairesAPI } from '../config/axiosConfig.js';

export const getQuestionnaires = createAsyncThunk(
  'questionnaires/fetchAll',
  async ({ params, page }, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.get(
        `/questionnaires?${params}&limit=4&page=${page}`
      );

      if (params.toString().length > 0) {
        successfullyToast('Questionnaires successfully found');
      }
      console.log(data.data);

      console.log('test axios');

      return data.data;
    } catch (error) {
      errToast("sorry, we don't have such a Questionnaires");
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const getQuestionnairesById = createAsyncThunk(
  'questionnaires/getQuestionnairesById',
  async (id, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.get(`/questionnaires/${id}`);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
