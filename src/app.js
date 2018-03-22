import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginLayout from "./layouts/LoginLayout";
import RegisterLayout from "./layouts/RegisterLayout";
import BasicLayout from "./layouts/BasicLayout";
import "./styles/main.css";
import { getCookie } from "./utils/utils";
import { isAuth } from "./services/api";

function confirmIsAuth() {
  isAuth().then(res => {
    if (res) {
      if (res.identity) {
        return true
      } else {
        return false
      }
    }
  });
}

export default class App extends React.Component {
  state = {
    isAuthenticated: confirmIsAuth(),
  }
  subscribeAuth = (auth) => {
    this.setState({
      isAuthenticated: auth,
    });
  }

  componentWillMount() {
    isAuth().then(res => {
      if (res) {
        if (res.identity) {
          this.setState({
            isAuthenticated: true
          })
        } else {
          this.setState({
            isAuthenticated: false
          })
        }
      }
    })
  }

  render() {
    console.log("app--render!!!", this.state.isAuthenticated, typeof this.state.isAuthenticated)
    return (
      <Router>
        <div>
          <Switch>
             <PublicRoute path="/user/login" component={LoginLayout} subscribeAuth={this.subscribeAuth} isAuthenticated={this.state.isAuthenticated} />
             <PublicRoute path="/user/register" component={RegisterLayout} subscribeAuth={this.subscribeAuth} isAuthenticated={this.state.isAuthenticated} />
             <PrivateRoute path="/" component={BasicLayout} subscribeAuth={this.subscribeAuth} isAuthenticated={this.state.isAuthenticated} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const PrivateRoute = ({ component: Component, subscribeAuth, isAuthenticated, ...rest }) => (
<Route {...rest} render={ 
  props =>( (isAuthenticated==true || isAuthenticated==undefined) ? (<Component {...props} subscribeAuth={subscribeAuth} />): (<Redirect to={{ pathname: '/user/login', state: { from: props.location }}}/>))
}
/>
)

const PublicRoute = ({ component: Component, subscribeAuth, isAuthenticated, ...rest }) => (
<Route {...rest} render={
  props => <Component {...props} subscribeAuth={subscribeAuth} />
}
/>
)

//暂时无需
const fakeAuth = {
  isAuthenticated: true,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}