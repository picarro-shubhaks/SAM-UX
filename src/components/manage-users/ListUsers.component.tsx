import React, { Fragment, useMemo } from 'react';

import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import './AgGrid.css';
import ActionCellRenderer from './UserActionCellRenderer';
import '../manage-users/style.css';
import Typography from '@mui/material/Typography';
import { getListOfUsers } from '../../sagas/manage-users/ListUsers.action';

const drawerWidth = 240;
export type columnDefType = {
  headerName: string;
  field: string;
  width: number;
  pinned?: string;
  cellRenderer?: string;
  hide?: boolean;
}[];
const columnDefs: columnDefType = [
  {
    headerName: 'First Name',
    field: 'firstName',
    width: 30,
  },
  {
    headerName: 'Last Name',
    field: 'lastName',
    width: 100,
  },
  {
    headerName: 'Email Address',
    field: 'email',
    width: 250,
  },
  {
    headerName: 'Actions',
    cellRenderer: 'actionCellRenderer',
    field: 'access',
    width: 100,
    pinned: 'right',
  },
];
const ListUsers: React.FC = () => {
  const loadCallStatus = useSelector((state: RootState) => state.user.loadCallStatus);
  const isInitialized = useSelector((state: RootState) => state.user.isInitialized);
  const dispatch = useDispatch();

  if (!isInitialized && loadCallStatus === 'IDLE') {
    dispatch(getListOfUsers());
  }
  const Users = useSelector((state: RootState) => state.user.users);

  const defaultColDef = {
    flex: 1,
    resizable: true,
    sortable: true,
    wrapText: true,
    autoHeight: true,
    filter: true,
  };

  const frameworkComponents = {
    actionCellRenderer: ActionCellRenderer,
  };

  // never changes, so we can use useMemo
  const autoGroupColumnDef = useMemo(
    () => ({
      cellRendererParams: {
        suppressCount: true,
        checkbox: true,
      },
      field: 'firstName',
      width: 300,
    }),
    [],
  );

  return (
    <Fragment>
      <Typography paragraph>Manage Users</Typography>
      <div className="ag-theme-balham" style={{ height: 400, width: 800 }}>
        <AgGridReact
          rowData={Users}
          defaultColDef={defaultColDef}
          frameworkComponents={frameworkComponents}
          autoGroupColumnDef={autoGroupColumnDef}
        >
          {columnDefs.map((column) => (
            <AgGridColumn {...column} key={column.field} />
          ))}
        </AgGridReact>
      </div>
    </Fragment>
  );
};

export default ListUsers;
