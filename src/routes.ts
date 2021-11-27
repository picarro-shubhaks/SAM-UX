import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ListGroups from './components/manage-groups/ListGroups.component';
import ListRoles from './components/manage-roles/ListRoles.component';
import ListUsers from './components/manage-users/ListUsers.component';

const DashboardRoutes = [
  {
    path: '/manage-users',
    name: 'Manage Users',
    icon: AccountBoxIcon,
    component: ListUsers,
    roles: { 'security-api': ['security-manage-users'] },
  },
  {
    path: '/manage-groups',
    name: 'Manage Groups',
    icon: SupervisorAccountIcon,
    component: ListGroups,
    roles: { 'security-api': ['security-manage-groups'] },
  },
  {
    path: '/manage-roles',
    name: 'Manage Roles',
    icon: InboxIcon,
    component: ListRoles,
    roles: { 'security-api': ['security-list-roles'] },
  },
];

export default DashboardRoutes;
