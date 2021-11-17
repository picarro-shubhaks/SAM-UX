import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { StyledEngineProvider } from '@mui/material/styles';
import Sidebar from '../sideBar/SideBar';
import LoginChangeEvent from '../login-change-event/LoginChangeEvent.component';

export function App() {
  return (
    <StyledEngineProvider injectFirst>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/loginChangeEvent" element={<LoginChangeEvent />} />
      </Routes>
    </StyledEngineProvider>
  );
}
