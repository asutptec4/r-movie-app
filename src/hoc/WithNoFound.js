import React from 'react';

const WithNoFound = (Component) => {
  const func = ({ movieCount, ...props }) => {
    if (movieCount) {
      return <Component {...props} />;
    }
    return <div className="app-no-content-label">No Movie Found</div>;
  };
  return func;
};

export default WithNoFound;
