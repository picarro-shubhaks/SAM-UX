import React, { Fragment, useState } from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import './AgGrid.css';

import '../manage-users/style.css';
import { getListOfUsers } from '../../sagas/manage-users/ListUsers.action';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { User } from '../../store/models/User.model';
import { getInitials } from '../../utils/get-initials';

const ListUsersResults: React.FC = () => {
  const loadCallStatus = useSelector((state: RootState) => state.user.loadCallStatus);
  const isInitialized = useSelector((state: RootState) => state.user.isInitialized);
  const dispatch = useDispatch();

  if (!isInitialized && loadCallStatus === 'IDLE') {
    dispatch(getListOfUsers());
  }

  const users = useSelector((state: RootState) => state.user.users);

  const [selectedCustomerIds, setSelectedCustomerIds] = useState([] as string[]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event: any) => {
    let newSelectedCustomerIds: string[] = [];

    if (event.target.checked) {
      newSelectedCustomerIds = users.map((user) => user.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event: any, id: any) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds: string[] = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds?.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds?.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds?.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds?.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1),
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === users.length}
                    color="primary"
                    indeterminate={selectedCustomerIds.length > 0 && selectedCustomerIds.length < users.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.slice(0, limit).map((user) => (
                <TableRow hover key={user.id} selected={selectedCustomerIds.indexOf(user.id) !== -1}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(user.id) !== -1}
                      onChange={(event) => handleSelectOne(event, user.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                      }}
                    >
                      <Avatar src="/static/images/avatars/avatar_7.png" sx={{ mr: 2 }}>
                        {getInitials(user.username)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {user.firstName}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={users.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default ListUsersResults;
