import testJson from '../__mocks__/test-data.json';
import { MovieApi } from './api';

jest.mock('axios');

describe('api tests', () => {
  test('should get all', () => {
    return MovieApi.getAll().then((data) => expect(data.data).toEqual(testJson));
  });

  test('should get all with params', () => {
    return MovieApi.getAll({ search: 'a', genres: ['a', 'b'], sortBy: 'title' }).then((data) =>
      expect(data.data).toEqual([]),
    );
  });

  test('should get by id ', () => {
    return MovieApi.getById(269149).then((data) => expect(data.data).toEqual(testJson[0]));
  });

  test('should create movie ', () => {
    const movie = { title: 'new' };
    return MovieApi.create(movie).then((data) => expect(data.data).toEqual(movie));
  });

  test('should update movie ', () => {
    const movie = { title: 'new' };
    return MovieApi.update(movie).then((data) => expect(data.data).toEqual(movie));
  });

  test('should delete by id ', () => {
    return MovieApi.delete(269149).then((data) => expect(data.status).toEqual(200));
  });
});
