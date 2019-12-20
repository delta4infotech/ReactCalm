import React from "react";

export default React.createContext({
  authenticated: false,
  user: null,
  onLoginUser: (user) => {},
  onLogoutUser: () => {},
  getUser: () => {}
});
