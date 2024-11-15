import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { http } from '../../api';

const MESSAGES_SLICE_NAME = 'messages';

export const getMessagesThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/get`,
  async (payload, thunkAPI) => {
    try {
      const response = await http.getMessages(payload);
      return response.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

export const updateMessageThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/update`,
  async ({ id, body }, thunkAPI) => {
    try {
      const response = await http.updateMessage(id, body);
      return response.data;
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue({
        message: err.response?.data || err.message,
      });
    }
  }
);

export const deleteMessageThunk = createAsyncThunk(
  `${MESSAGES_SLICE_NAME}/delete`,
  async (id, thunkAPI) => {
    try {
      await http.deleteMessage(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue({ message: err.message });
    }
  }
);

const initialState = {
  messages: [],
  isFetching: false,
  error: null,
  limit: 100,
};

const messagesSlice = createSlice({
  name: MESSAGES_SLICE_NAME,
  initialState,
  reducers: {
    newMessagePending (state) {
      state.isFetching = true;
      state.error = null;
    },
    newMessageSuccess (state, { payload }) {
      state.isFetching = false;
      if (state.messages.length >= state.limit) {
        state.messages.splice(0, 1);
      }
      state.messages.push(payload);
    },
    newMessageError (state, { payload }) {
      state.isFetching = false;
      state.error = payload;
    },
    updateMessageSuccess (state, { payload }) {
      const index = state.messages.findIndex(msg => msg._id === payload.id);
      if (index !== -1) {
        state.messages[index] = payload;
      }
    },
    updateMessageError (state, { payload }) {
      state.isFetching = false;
      state.error = payload;
    },
    deleteMessageSuccess (state, { payload }) {
      state.isFetching = false;
      state.messages = state.messages.filter(msg => msg._id !== payload.id); // видаляє повідомлення з масиву
    },
    deleteMessageError (state, { payload }) {
      state.isFetching = false;
      state.error = payload;
    },
  },
  extraReducers: builder => {
    // GET
    builder.addCase(getMessagesThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(getMessagesThunk.fulfilled, (state, { payload }) => {
      state.messages = [];
      state.isFetching = false;
      state.messages.push(...payload.reverse());
    });
    builder.addCase(getMessagesThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // DELETE
    builder.addCase(deleteMessageThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });
    builder.addCase(deleteMessageThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.messages = state.messages.filter(
        message => message._id !== payload
      );
    });
    builder.addCase(deleteMessageThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });

    // UPDATE
    builder.addCase(updateMessageThunk.pending, state => {
      state.isFetching = true;
      state.error = null;
    });

    builder.addCase(updateMessageThunk.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      if (payload && payload._id) {
        const index = state.messages.findIndex(msg => msg._id === payload._id);
        if (index !== -1) {
          state.messages[index] = payload;
        }
      } else {
        console.error('Помилка: payload не містить _id');
      }
    });

    builder.addCase(updateMessageThunk.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.error = payload;
    });
  },
});

const { reducer, actions } = messagesSlice;
export const {
  newMessagePending,
  newMessageSuccess,
  newMessageError,
  deleteMessageSuccess,
  updateMessageSuccess,
} = actions;

export default reducer;
