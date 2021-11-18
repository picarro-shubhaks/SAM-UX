import React, { Fragment } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import ApiServerStatus from '../api-server-status/ApiServerStatus.component';
import { API_SERVER_STATUS } from '../../store/api-server-status/ApiServerStatus.slice';
import IconButton from '@mui/material/IconButton';
import { goToKeyCloakSSOLogoutPageHandler } from '../../sso/KeyCloakSSO';

const CurrentUser: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
  const apiServerStatus = useSelector((state: RootState) => state.apiServerStatus.apiServerStatus);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleCurrentUserClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <ApiServerStatus />
      {apiServerStatus === API_SERVER_STATUS.OK && currentUser !== null && (
        <Fragment>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleCurrentUserClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={goToKeyCloakSSOLogoutPageHandler}>Logout</MenuItem>
          </Menu>
        </Fragment>
      )}
    </Fragment>
  );
};

export default CurrentUser;
