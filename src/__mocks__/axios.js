import testJson from '../__mocks__/test-data.json';

const axios = jest.createMockFromModule('axios');

const getResponse = (url, config) => ({
  data: url ? testJson[0] : config ? testJson.filter((m) => m.title === config.search) : testJson,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
});

const postResponse = (url, data) => ({
  data: data,
  status: 200,
  statusText: 'OK',
  config: {},
  headers: {},
});

axios.create = () => ({
  get: jest.fn((url, config) => Promise.resolve(getResponse(url, config))),
  post: jest.fn((url, data) => Promise.resolve(postResponse(url, data))),
  put: jest.fn((url, data) => Promise.resolve(postResponse(url, data))),
  delete: jest.fn((url, config) => Promise.resolve(getResponse(url))),
});

module.exports = axios;
