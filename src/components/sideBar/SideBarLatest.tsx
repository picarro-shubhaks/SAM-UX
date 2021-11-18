import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CurrentUser from '../current-user/CurrentUser.component';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/RootReducer';
import ListUsers from '../manage-users/ListUsers.component';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import routes from '../../routes';
import { Route, Routes } from 'react-router-dom';
import ListGroups from '../manage-groups/ListGroups.component';
import ListRoles from '../manage-roles/ListRoles.component';
import LoginChangeEvent from '../login-change-event/LoginChangeEvent.component';
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { NotFound } from '../not-found/NotFound.component';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

export default function SideBarLatest(props: Props) {
  const currentUser = useSelector((state: RootState) => state.currentUser.currentUser);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const checkPermission = (roles: string[]) => {
    if (currentUser) {
      const a1 = currentUser.roles['security-api'];
      const a2 = roles;
      const matchedRoles = a1.filter((value) => a2.includes(value));
      return matchedRoles.length > 0;
    }
    return false;
  };

  const getRoutes = () => {
    const itemsRoutes = [];
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      if (checkPermission(route.roles['security-api'])) {
        console.log(route.component);
        itemsRoutes.push(<Route path={route.path}>{route.component}</Route>);
      } else {
        itemsRoutes.push(<Route path={route.path}>{<React.Fragment>{'Access Denied'}</React.Fragment>}</Route>);
      }
    }
    return itemsRoutes;
  };

  const getSideNavLinks = () => {
    const items = [];
    for (let index = 0; index < routes.length; index++) {
      const route = routes[index];
      if (checkPermission(route.roles['security-api'])) {
        items.push(
          <NavLink to={route.path} key={index}>
            <ListItem button key={index}>
              <ListItemIcon>{index % 2 === 0 ? <AccountBoxIcon /> : <SupervisorAccountIcon />}</ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          </NavLink>,
        );
      }
    }
    return items;
  };

  const links = <List>{getSideNavLinks()}</List>;
  // const protectedRoutes = <Routes>{getRoutes()}</Routes>;

  const RequireAuth = ({ roles, children }: { roles: string[]; children: JSX.Element }) => {
    if (roles.length === 0) {
      return children;
    }
    if (!checkPermission(roles)) {
      return <React.Fragment>{'Permission Denied'}</React.Fragment>;
    }
    return children;
  };

  // const protectedRoutes = (
  //   <Routes>
  //     {routes.map((route) => {
  //       return (
  //         <Route
  //           key={route.path}
  //           path={route.path}
  //           element={
  //             <RequireAuth roles={route.roles['security-api']}>
  //               <ListUsers />
  //             </RequireAuth>
  //           }
  //         />
  //       );
  //     })}
  //   </Routes>
  // );

  const protectedRoutes = (
    <Routes>
      <Route
        path="/loginChangeEvent"
        element={
          <RequireAuth roles={[]}>
            <LoginChangeEvent />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-users"
        element={
          <RequireAuth roles={['security-manage-users']}>
            <ListUsers />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-groups"
        element={
          <RequireAuth roles={['security-manage-groups']}>
            <ListGroups />
          </RequireAuth>
        }
      />
      <Route
        path="/manage-roles"
        element={
          <RequireAuth roles={['security-manage-roles1']}>
            <ListRoles />
          </RequireAuth>
        }
      />
    </Routes>
  );

  const drawer = (
    <div>
      <List>
        <NavLink to="/" key="SAM">
          <ListItem button key="SAM">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="SAM" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
      {links}
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Picarro
          </Typography>
          <CurrentUser></CurrentUser>
        </Toolbar>
      </AppBar>
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
        {protectedRoutes}
      </Box>
    </Box>
  );
}
