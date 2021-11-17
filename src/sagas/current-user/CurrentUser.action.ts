import { Action } from "redux";

export const GET_CURRENT_USER = "GET_CURRENT_USER";

export function getCurrentUser(): Action<string> {
  return {
    type: GET_CURRENT_USER,
  };
}
