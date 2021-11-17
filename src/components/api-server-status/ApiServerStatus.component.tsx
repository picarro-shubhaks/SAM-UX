import React from 'react';
import { Fragment, useState } from 'react';

import { useDispatch } from 'react-redux';
import { getCurrentUser } from '../../sagas/current-user/CurrentUser.action';
import goToKeyCloakSSOPageHandler from '../../utils/KeyCloakSSO';
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
  return (
    <Fragment>
      {(apiServerStatus === API_SERVER_STATUS.NETWORK_ERROR ||
        apiServerStatus === API_SERVER_STATUS.SERVER_UNAVAILABLE) && (
        <Button variant="contained" size="small" onClick={initiateGetCurrentUser}>
          Retry Login
        </Button>
      )}
      {apiServerStatus === API_SERVER_STATUS.USER_LOGIN_REQUIRED && (
        <Button variant="contained" size="small" onClick={goToKeyCloakSSOPageHandler}>
          Login{' '}
        </Button>
      )}
    </Fragment>
  );
};

export default ApiServerStatus;
