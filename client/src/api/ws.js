import { io } from 'socket.io-client';
import {
  newMessageError,
  newMessageSuccess,
  deleteMessageSuccess,
  updateMessageSuccess,
} from '../store/slices/messagesSlice';
import CONSTANTS from '../constants';

const {
  SOCKET_EVENTS: {
    NEW_MESSAGE,
    NEW_MESSAGE_SUCCESS,
    NEW_MESSAGE_ERROR,
    DELETE_MESSAGE,
    UPDATE_MESSAGE,
  },
} = CONSTANTS;

const socketClient = io('ws://localhost:5001');

export const createMessage = newMessage => {
  socketClient.emit(NEW_MESSAGE, newMessage);
};
export const initSocket = store => {
  socketClient.on(NEW_MESSAGE_SUCCESS, payload => {
    store.dispatch(newMessageSuccess(payload));
  });

  socketClient.on(NEW_MESSAGE_ERROR, payload => {
    store.dispatch(newMessageError(payload));
  });

  socketClient.on(UPDATE_MESSAGE, payload => {
    store.dispatch(updateMessageSuccess(payload));
  });

  socketClient.on(DELETE_MESSAGE, payload => {
    store.dispatch(deleteMessageSuccess(payload));
  });

  socketClient.on('connect', () => {
    console.log('Connected to server');
  });

  socketClient.on('disconnect', () => {
    console.log('Disconnected from server');
  });
};
export const closeSocket = () => {
  if (socketClient.connected) {
    socketClient.disconnect();
  }
};
