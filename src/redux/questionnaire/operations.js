import { createAsyncThunk } from '@reduxjs/toolkit';
import { errToast, successfullyToast } from '../../utils/toast.js';
import { questionnairesAPI } from '../config/axiosConfig.js';

export const getQuestionnaires = createAsyncThunk(
  'questionnaires/fetchAll',
  async (
    { page = 1, perPage = 6, sortBy = 'createdAt', sortOrder = 'asc' },
    thunkApi
  ) => {
    try {
      const { data } = await questionnairesAPI.get(
        `/questionnaires?page=${page}&perPage=${perPage}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      );

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
      console.log(data);
      return data.data;
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
  async ({ id, credentials, navigate }, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.patch(
        `/questionnaires/${id}`,
        credentials
      );

      if (data.status === 201) {
        navigate('/questionnaires');
      }
      successfullyToast('Successfully update');
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

export const deleteQuestionnaires = createAsyncThunk(
  'questionnaires/deletetQuestionnaires',
  async (id, thunkApi) => {
    try {
      const { data } = await questionnairesAPI.delete(`/questionnaires/${id}`);
      console.log(data);
      return data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
