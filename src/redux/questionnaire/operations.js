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

export const postQuestionnaire = createAsyncThunk(
  'questionnaires/createQuestionnaire',
  async (credentials, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.post(
        '/questionnaires',
        credentials
      );
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const patchQuestionnaire = createAsyncThunk(
  'questionnaires/updateQuestionnaire',
  async ({ id, credentials }, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.patch(
        `/questionnaires/${id}`,
        credentials
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
