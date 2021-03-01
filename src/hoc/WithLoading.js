import React from 'react';

const WithLoading = (Component) => {
  const func = ({ isLoading, ...props }) => {
    if (!isLoading) {
      return <Component {...props} />;
    }
    return <div className="app-no-content-label">Loading...</div>;
  };
  return func;
};

export default WithLoading;
