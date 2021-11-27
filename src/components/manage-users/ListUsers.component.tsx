import React, { Fragment } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ListUsersResults from './ListUsersResults.component';
import ListUsersToolbar from './ListUsersToolbar.component';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';

const ListUsers: React.FC = () => {
  const loadCallStatus = useSelector((state: RootState) => state.user.loadCallStatus);
  return (
    <Fragment>
      {loadCallStatus === 'FAILED' && <Typography paragraph>Error occured please Contact Admin </Typography>}
      {loadCallStatus !== 'FAILED' && (
        <div>
          {' '}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              py: 8,
            }}
          >
            <Container maxWidth={false}>
              <ListUsersToolbar />
              <Box sx={{ mt: 3 }}>
                <ListUsersResults />
              </Box>
            </Container>
          </Box>
        </div>
      )}
    </Fragment>
  );
};

export default ListUsers;
