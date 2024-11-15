import axios from 'axios';

const axiosOptions = {
  baseURL: 'http://localhost:5001/api',
};

const apiInstance = axios.create(axiosOptions);

export const getMessages = limit => apiInstance.get(`/messages?limit=${limit}`);

export const updateMessage = async (id, body) => {
  const response = await apiInstance.patch(`/messages/${id}`, { body }); // Використовуємо apiInstance
  return response.data;
};

export const deleteMessage = async id => {
  await apiInstance.delete(`/messages/${id}`);
};
