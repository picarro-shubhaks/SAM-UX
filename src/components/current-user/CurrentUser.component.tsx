import React, { Fragment } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import ApiServerStatus from '../api-server-status/ApiServerStatus.component';

const CurrentUser: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);

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
      {currentUser !== null && (
        <div>
          <Button variant="contained" onClick={handleCurrentUserClick} startIcon={<AccountCircle />} size="small">
            {currentUser.firstName}
          </Button>

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
          </Menu>
        </div>
      )}
    </Fragment>
  );
};

export default CurrentUser;
