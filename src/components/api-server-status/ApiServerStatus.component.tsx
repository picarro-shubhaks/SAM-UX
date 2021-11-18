import React from 'react';
import { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../sagas/current-user/CurrentUser.action';
import { goToKeyCloakSSOPageHandler } from '../../sso/KeyCloakSSO';
import { API_SERVER_STATUS } from '../../store/api-server-status/ApiServerStatus.slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import Button from '@mui/material/Button';
const ApiServerStatus: React.FC = () => {
  const apiServerStatus = useSelector((state: RootState) => state.apiServerStatus.apiServerStatus);
  const dispatch = useDispatch();
  const [firstLoad, setFirstLoad] = useState(true);
  const initiateGetCurrentUser = () => {
    dispatch(getCurrentUser());
  };

  if (firstLoad) {
    initiateGetCurrentUser();
    setFirstLoad(false);
  }
  if (
    apiServerStatus === API_SERVER_STATUS.USER_LOGIN_REQUIRED ||
    apiServerStatus === API_SERVER_STATUS.USER_NOT_AUTHORISED
  )
    goToKeyCloakSSOPageHandler();

  if (apiServerStatus === API_SERVER_STATUS.NETWORK_ERROR || apiServerStatus === API_SERVER_STATUS.SERVER_UNAVAILABLE)
    initiateGetCurrentUser();

  return <Fragment></Fragment>;
};

export default ApiServerStatus;
