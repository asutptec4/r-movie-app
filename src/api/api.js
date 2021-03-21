import { create } from 'axios';

const instance = create({
  baseURL: 'http://localhost:4000',
});

const buildQuery = (params) => {
  if (!params) {
    return;
  }
  const { search, genres, sortBy, sortOrder = 'desc', offset = 0, limit = 15 } = params;
  const requestParam = {
    params: {
      offset,
      limit,
    },
  };
  if (sortBy) {
    requestParam.params = { ...requestParam.params, sortBy, sortOrder };
  }
  if (genres) {
    requestParam.params = { ...requestParam.params, filter: genres.join(',') };
  }
  if (search) {
    requestParam.params = { ...requestParam.params, search, searchBy: 'title' };
  }
  console.log(requestParam);
  return requestParam;
};

const responseHandler = (r) => ({
  data: r.data,
  status: r.status,
  statusText: r.statusText,
});

export const MovieApi = {
  getAll: (params) => instance.get('/movies', buildQuery(params)).then(responseHandler),
  getById: (movieId) => instance.get(`/movies/${movieId}`).then(responseHandler),
  create: (movie) => instance.post(`/movies`, movie).then(responseHandler),
  update: (movie) => instance.put(`/movies`, movie).then(responseHandler),
  delete: (movieId) => instance.delete(`/movies/${movieId}`).then(responseHandler),
};
