import { act, renderHook } from '@testing-library/react-hooks';

import { useComponentDidUpdate, usePrevValue, useSetReset, useToggle } from './custom-hooks';

describe('custom-hooks', () => {
  test('useComponentDidUpdate', () => {
    const callback = jest.fn();
    let id = 1;
    const { rerender } = renderHook(() => useComponentDidUpdate(callback, [id]));
    expect(callback).not.toHaveBeenCalled();
    id = 2;
    rerender();
    expect(callback).toHaveBeenCalled();
  });

  test('useSetReset', () => {
    const { result } = renderHook(() => useSetReset(true));
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(true);
  });

  test('usePrevValue', () => {
    const { result, rerender } = renderHook(() => usePrevValue('1'));
    expect(result.current).toBeUndefined();
    rerender();
    expect(result.current).toBe('1');
  });

  test('useToggle', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1]();
    });
    expect(result.current[0]).toBe(false);
  });
});
