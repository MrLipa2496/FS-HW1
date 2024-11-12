import { combineReducers } from '@reduxjs/toolkit';
import messagesReducer from './slices/messagesSlice';

const rootReducer = combineReducers({
  chat: messagesReducer,
});

export default rootReducer;
