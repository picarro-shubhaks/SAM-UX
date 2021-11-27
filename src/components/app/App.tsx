import React, { useState } from 'react';

import { StyledEngineProvider } from '@mui/material/styles';

import SideBar from '../sideBar/SideBar';

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <SideBar></SideBar>
    </StyledEngineProvider>
  );
}
