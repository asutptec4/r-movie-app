import { ASC_ORDER, DESC_ORDER } from '../constant';
import {
  calcLastPage,
  defaultHandler,
  getReleaseYear,
  ratingToStr,
  roundRating,
  toggleSortDirection,
  updateOptions,
} from './util-func';

describe('util-func testing', () => {
  test('roundRating', () => {
    expect(roundRating(0)).toEqual('0.0');
    expect(roundRating(5.79)).toEqual('5.8');
    expect(roundRating(10.23)).toEqual('10.2');
  });

  test('ratingToStr', () => {
    expect(ratingToStr(1)).toEqual('bad');
    expect(ratingToStr(5)).toEqual('norm');
    expect(ratingToStr(8)).toEqual('good');
  });

  test('getReleaseYear', () => {
    expect(getReleaseYear('2014-04-20')).toEqual('2014');
    expect(getReleaseYear(null)).toEqual('');
  });

  test('updateOptions', () => {
    const options = [
      { id: 1, name: '1' },
      { id: 2, name: '2' },
    ];
    expect(updateOptions(options, 1)).toEqual([
      { id: 1, name: '1', selected: true },
      { id: 2, name: '2', selected: false },
    ]);
  });

  test('calcLastPage', () => {
    expect(calcLastPage(100, 15)).toEqual(7);
    expect(calcLastPage(20, 30)).toEqual(1);
    expect(calcLastPage(30, 10)).toEqual(3);
  });

  test('toggleSortDirection', () => {
    expect(toggleSortDirection(null)).toEqual(ASC_ORDER);
    expect(toggleSortDirection(DESC_ORDER)).toEqual(ASC_ORDER);
    expect(toggleSortDirection(ASC_ORDER)).toEqual(DESC_ORDER);
  });

  test('defaultHandler', () => {
    const mockWarn = jest.fn();
    console.warn = mockWarn;
    defaultHandler(1);
    expect(mockWarn).toHaveBeenCalled();
  });
});
