import React from "react";
import "./styles/main.css";
import { Layout, Menu, Icon } from 'antd';
import { getMenuData } from './common/menu';
import { BrowserRouter as Router, Route, Switch, Redirect, PrivateRoute } from "react-router-dom";
import SiderMenu from "./components/SiderMenu";
import GlobalHeader from "./components/GlobalHeader";
import GlobalFooter from "./components/GlobalFooter";
import TextOne from "./components/Test/test1.js";
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
export default class App extends React.Component {
  componentDidMount() {
    const menuData = getMenuData();
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
                <Route exact path='/' component={TextOne}/>
                <Route path='/about' component={TextOne}/>
                <Route path='/contact' component={TextOne}/>
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
    );
  }
}