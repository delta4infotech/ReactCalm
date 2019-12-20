import React, { Component } from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import { Route, Switch, withRouter, Redirect } from "react-router-dom";


import UserContext from "./context/user-context";

import { LOGIN } from "./services/Constraints";
import { HttpService } from "./services/HttpService";

const theme = createMuiTheme({
  palette: {
    // type: "dark",
    primary: {
      main: "#35abde"
    },
    secondary: {
      main: "#374b5a"
    },
    green: {
      main: "#39e08b"
    },
    red: {
      main: "#ff2b2b"
    }
  },
  typography: {
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10
  }
});

class App extends Component {
  state = {
    user: null,
    authenticated: false
  };

  componentDidMount() {
    function triggerResize() {
      if (document.createEvent) {
        var resizeEvent = window.document.createEvent("UIEvents");
        resizeEvent.initUIEvent("resize", true, false, window, 0);
        window.dispatchEvent(resizeEvent);
      } else {
        window.dispatchEvent(new Event("resize"));
      }
    }
    (function() {
      let i = 0;
      let interval = setInterval(() => {
        triggerResize();
        if (i === 5) {
          clearInterval(interval);
        }
        i++;
      }, 1000);
      var lastTime = 0;
      var vendors = ["ms", "moz", "webkit", "o"];
      for (
        var x = 0;
        x < vendors.length && !window.requestAnimationFrame;
        ++x
      ) {
        window.requestAnimationFrame =
          window[vendors[x] + "RequestAnimationFrame"];
        window.cancelAnimationFrame =
          window[vendors[x] + "CancelAnimationFrame"] ||
          window[vendors[x] + "CancelRequestAnimationFrame"];
      }
      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
    })();
    document.addEventListener("DOMContentLoaded", function() {
      let scrollTop = 0,
        tweened = 0,
        winHeight = 0;
      let wrap = document.getElementById("root");
      wrap.style.position = "fixed";
      wrap.style.width = "100%";
      wrap.style.top = "0";
      wrap.style.left = "0";
      wrap.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)";
      let _ = document.createElement("div");
      _.style.height = wrap.clientHeight + "px";
      document.body.appendChild(_);
      let update = function() {
        window.requestAnimationFrame(update);
        let app = document.getElementById("root");
        if (Math.abs(scrollTop - tweened) > 0) {
          let // top = Math.floor(tweened += .25 * (scrollTop - tweened)),
            top = (tweened += 0.03 * (scrollTop - tweened)),
            bot = top + winHeight,
            wt = (wrap.style.transform = `matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,${top *
              -1},0,1)`);
          _.style.height = wrap.clientHeight + "px";
        }
      };
      let listen = function(el, on, fn) {
        (el.addEventListener || ((on = "on" + on) && el.attachEvent))(
          on,
          fn,
          false
        );
      };
      let scroll = function() {
        scrollTop = Math.max(
          0,
          document.documentElement.scrollTop || window.pageYOffset || 0
        );
      };
      listen(window, "scroll", scroll);
      update();
      window.addEventListener(
        "resize",
        () => {
          update();
          _.style.height = wrap.clientHeight + "px";
        },
        false
      );
    });

    if (localStorage.getItem("user")) {
      this.setState({
        user: JSON.parse(localStorage.getItem("user")),
        authenticated: true
      });
    }
  }

  onLoginUser = (user) => {
    this.setState({
      user: user,
      authenticated: true
    });
    localStorage.setItem("user", JSON.stringify(user));
  };

  getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  onLogoutUser = () => {
    console.log("Logout user");
    this.setState({
      user: null,
      authenticated: false
    });
    localStorage.clear();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/" exact>
          <BrowsePranks />
        </Route>

        <Route path="/pranks/:prankName" component={Prank} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.state.authenticated) {
      routes = (
        <Switch>
          <Route path="/" exact>
            <BrowsePranks />
          </Route>
          <Route path="/pranks/:prankName" component={Prank} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <UserContext.Provider
        value={{
          authenticated: this.state.authenticated,
          user: this.state.user,
          onLoginUser: this.onLoginUser,
          onLogoutUser: this.onLogoutUser,
          getUser: this.getUser
        }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="App">
            <Layout>{routes}</Layout>
          </div>
        </ThemeProvider>
      </UserContext.Provider>
    );
  }
}

export default App;
