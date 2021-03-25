import { create } from 'axios';

import { DESC_ORDER } from '../constant';

const instance = create({
  baseURL: 'http://localhost:4000/movies',
});

const buildQuery = (params) => {
  if (!params) {
    return;
  }
  const { search, genres, sortBy, sortOrder = DESC_ORDER, offset = 0, limit = 15 } = params;
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
  return requestParam;
};

const responseHandler = ({ data, status, statusText }) => ({ data, status, statusText });

export const MovieApi = {
  getAll: (params) => instance.get('', buildQuery(params)).then(responseHandler),
  getById: (movieId) => instance.get(`/${movieId}`).then(responseHandler),
  create: (movie) => instance.post('', movie).then(responseHandler),
  update: (movie) => instance.put('', movie).then(responseHandler),
  delete: (movieId) => instance.delete(`/${movieId}`).then(responseHandler),
};
