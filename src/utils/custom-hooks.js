import { useCallback, useEffect, useRef, useState } from 'react';

export const useComponentDidUpdate = (callback, props) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      callback();
    }
  }, props);
};

export const useSetReset = (initState = false) => {
  const [flag, setFlag] = useState(initState);

  const set = useCallback(() => {
    setFlag(true);
  }, [flag]);

  const reset = useCallback(() => {
    setFlag(false);
  }, [flag]);

  return [flag, set, reset];
};
