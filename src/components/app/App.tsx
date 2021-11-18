import React from 'react';

import { StyledEngineProvider } from '@mui/material/styles';

import SideBarLatest from '../sideBar/SideBarLatest';

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <SideBarLatest />
    </StyledEngineProvider>
  );
}
