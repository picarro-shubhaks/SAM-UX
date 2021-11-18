import { combineReducers } from 'redux';
import { ApiServerReducer } from './api-server-status/ApiServerStatus.slice';
import { CurrentUserReducer } from './current-user/CurrentUser.slice';

import { UserReducer } from './manage-users/User.slice';

export const rootReducer = combineReducers({
  user: UserReducer,
  currentUser: CurrentUserReducer,
  apiServerStatus: ApiServerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
