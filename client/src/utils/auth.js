const Auth = {
  isAuthenticated: JSON.parse(localStorage.getItem('authenticated')),
  authenticate(cb) {
    localStorage.setItem('authenticated', 1);
  },
  signout(cb) {
    localStorage.setItem('authenticated', 0);
  }
};

export default Auth;
