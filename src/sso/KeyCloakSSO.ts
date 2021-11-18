import { LOGIN_CHANGE_EVENT, LOGIN_URL, LOGOUT_URL } from '../constants';

export function goToKeyCloakSSOPageHandler() {
  window.open(`${LOGIN_URL}?redirect-uri=${window.location.origin}${LOGIN_CHANGE_EVENT}`, '_self');
}

export function goToKeyCloakSSOLogoutPageHandler() {
  window.open(LOGOUT_URL, '_self');
}
