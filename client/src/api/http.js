import axios from 'axios';

const axiosOptions = {
  baseURL: 'http://127.0.0.1:5001/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);
