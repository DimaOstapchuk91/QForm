import { createAsyncThunk } from '@reduxjs/toolkit';
import { errToast, successfullyToast } from '../../utils/toast.js';
import { questionnairesAPI } from '../config/axiosConfig.js';

export const getQuestionnaires = createAsyncThunk(
  'questionnaires/fetchAll',
  async (_, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.get(`/questionnaires`);

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
  async ({ credentials, navigate }, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.post(
        '/questionnaires',
        credentials
      );
      if (data.status === 201) {
        navigate('/questionnaires');
      }
      console.log(data);
      successfullyToast('Successfully created');
      return data;
    } catch (error) {
      errToast('Sorry, mistake');
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

export const postAnswer = createAsyncThunk(
  'questionnaires/answer',
  async (answer, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.post('/answer', answer);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
