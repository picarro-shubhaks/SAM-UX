import React, { Fragment } from 'react';
import { LOGIN_CHANGE_EVENT } from '../../constants';

const LoginChangeEvent: React.FC = () => {
  if (window.opener) {
    window.opener.dispacthEvent(LOGIN_CHANGE_EVENT);
  }

  return <Fragment></Fragment>;
};

export default LoginChangeEvent;
