import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <h1>
      404. Route not found for <code>{pathname}</code>
    </h1>
  );
};

export { NotFound };
