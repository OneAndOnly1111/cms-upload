import React from "react";
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./styles/main.css";
import { getMenuData } from './common/menu';
// import { getRouterData } from './common/route';
import SiderMenu from "./components/SiderMenu";
import GlobalHeader from "./components/GlobalHeader";
import GlobalFooter from "./components/GlobalFooter";
import TextOne from "./components/Test";
import Login from "./components/Login";
import NotFound from "./components/Exception/404";
const { Header, Sider, Content, Footer } = Layout;
/**
 * 根据菜单取得重定向地址.
 */
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

const getUrl = () => {
  let url = window.location.href.split("/");
  url = url.splice(3);
  url = url.join("/");
  return url;
  console.log("url", url);
  window.location.reload();
}

getUrl()
export default class App extends React.Component {
  componentDidMount() {
    const menuData = getMenuData();
    console.log("APP-did-mount", menuData);
  }


  componentDidUpdate(prevProps, prevState) {
    console.log("APP-Update!!!");
    getUrl();
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
        <Router>
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
                  {
                    redirectData.map(item =>
                      <Redirect key={item.from} exact from={item.from} to={item.to} />
                    )
                  }
                  <Route exact path='/' component={TextOne} />
                  <Route exact path='/about' component={TextOne} />
                  <Route exact path='/contact' component={TextOne} />
                  <Route exact path='/dashboard/monitor' component={TextOne} />
                  <Route exact path='/dashboard/analysis' component={TextOne} />
                  <Route exact path='/user/login' component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </Content>
              <GlobalFooter
                links={[{
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
                }]}
                copyright={
                  <div>
                    Copyright <Icon type="copyright" /> 2018 云熵网络科技技术部出品
                  </div>
                }
              />
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}