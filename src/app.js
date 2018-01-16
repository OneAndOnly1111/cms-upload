import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import Login from "./layouts/LoginLayout";
import BasicLayout from "./layouts/BasicLayout";
import "./styles/main.css";


export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
             <Route path="/login" component={Login} />
             <PrivateRoute path="/" component={BasicLayout} />
          </Switch>
        </div>
      </Router>
    );
  }
}

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

const PrivateRoute = ({ component: Component, ...rest }) => (
<Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
): (
<Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
)
)
}
/>
)

/*
import "./styles/main.css";
import { getMenuData } from './common/menu';
import SiderMenu from "./components/SiderMenu";
import GlobalHeader from "./components/GlobalHeader";
import GlobalFooter from "./components/GlobalFooter";
import TextOne from "./components/Test";
import Login from "./components/Login";
import NotFound from "./components/Exception/404";
const { Header, Sider, Content, Footer } = Layout;
const links = [{
  title: '云熵官网',
  href: 'http://crazycdn.com',
  blankTarget: true,
}, {
  title: 'GitHub',
  href: 'https://github.com/oneandonly1111/console',
  blankTarget: true,
}, {
  title: 'Ant Design',
  href: 'http://ant.design',
  blankTarget: true,
}];
const copyright = <div>Copyright <Icon type="copyright" /> 2018 云熵网络科技技术部出品</div>;

 //根据菜单取得重定向地址.
 
const redirectData = [];
const getRedirect = (item) => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `/${item.path}`,
        to: `/${item.children[0].path}`,
      });
      item.children.forEach((children) => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);
console.log("redirectData", redirectData);



class BasicLayout extends React.Component {
  componentDidMount() {
    const menuData = getMenuData();
    console.log("APP-did-mount", menuData);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("APP-Update!!!");
  }

  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <div>
        <Layout>
          <SiderMenu
            menuData={getMenuData()}
            collapsed={collapsed}
          />
          <Layout>
            <GlobalHeader
              collapsed={collapsed}
              onCollapse={this.toggle}
            />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Switch>
                <Route exact path='/' component={TextOne} />
                <Route exact path='/about' component={TextOne} />
                <Route exact path='/contact' component={TextOne} />
                <Route exact path='/dashboard/monitor' component={TextOne} />
                <Route exact path='/dashboard/analysis' component={TextOne} />
                <Route component={NotFound} />
              </Switch>
            </Content>
            <GlobalFooter links={links} copyright={copyright}/>
          </Layout>
        </Layout>
      </div>
    );
  }
}
*/