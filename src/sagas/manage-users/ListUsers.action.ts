import { Action } from 'redux';

export const GET_LIST_OF_USERS = 'GET_LIST_OF_USERS';

export function getListOfUsers(): Action<string> {
  return {
    type: GET_LIST_OF_USERS,
  };
}
