import React from "react";
import { Layout, Icon } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import SiderMenu from "../components/SiderMenu";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import TextOne from "../components/Test";
import NotFound from "../components/Exception/404";
import { getRouterData } from "../common/route.js";


const { Content } = Layout;
const copyright = <div>Copyright <Icon type="copyright" /> 2018 云熵网络科技技术部出品</div>;
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

export default class BasicLayout extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  componentDidMount() {
    console.log("getRouterData", getRouterData())
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("BasicLayout-Update!!!");
  }

  render() {
    const { collapsed } = this.state;
    console.log("getRouterData", getRouterData())
    return (
      <div>
        <Layout>
          <SiderMenu
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
                  getRouterData().map((route,index)=>(
                    <Route exact={route.exact} path={route.path} key={route.key||index} component={route.componentName} />
                  ))
                }
                <Redirect exact from="/" to="/dashboard/analysis" />
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

{
  /*<Route exact path='/' component={TextOne} />
  <Route exact path='/about' component={TextOne} />
  <Route exact path='/contact' component={TextOne} />
  <Route exact path='/dashboard/monitor' component={TextOne} />
  <Route exact path='/dashboard/analysis' component={TextOne} />*/
}