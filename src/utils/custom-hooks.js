import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

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

export const usePrevValue = (value) => {
  const prevValueRef = useRef();

  useEffect(() => {
    prevValueRef.current = value;
  });

  return prevValueRef.current;
};

export const useToggle = (initialState) => {
  const [value, setValue] = useState(initialState);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
};

export const useOnRouteMatch = (routeProps, onRouteMatch) => {
  const location = useLocation();
  const match = useRouteMatch(routeProps);

  useEffect(() => {
    onRouteMatch(match);
  }, [location]);
};
