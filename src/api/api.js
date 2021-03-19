import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000',
});

const responseHandler = (r) => ({
  data: r.data,
  status: r.status,
  statusText: r.statusText,
});

export const MovieApi = {
  getAll: () => instance.get('/movies').then(responseHandler),
  getById: (movieId) => instance.get(`/movies/${movieId}`).then(responseHandler),
  create: (movie) => instance.post(`/movies`, movie).then(responseHandler),
  update: (movie) => instance.put(`/movies`, movie).then(responseHandler),
  delete: (movieId) => instance.delete(`/movies/${movieId}`).then(responseHandler),
};
