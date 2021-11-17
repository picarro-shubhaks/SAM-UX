import { LOGIN_CHANGE_EVENT, LOGIN_URL } from '../constants';

const goToKeyCloakSSOPageHandler = () => {
  window.open(`${LOGIN_URL}?redirect-uri=${window.location.origin}${LOGIN_CHANGE_EVENT}`, '_self');
};

export default goToKeyCloakSSOPageHandler;
