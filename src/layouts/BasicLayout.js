import React from "react";
import { Layout, Icon, notification, Breadcrumb } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter } from "react-router-dom";
import SiderMenu from "../components/SiderMenu";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import TextOne from "../components/Test";
import NotFound from "../components/Exception/404";
import { getRouterData } from "../common/route.js";
import { getCookie, setCookie } from "../utils/utils";
import { queryUserInfo, isAuth } from "../services/api";
import styles from './BasicLayout.less';

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
    /*获取用户信息 以及判断是否登录*/
    isAuth().then(res => {
      if (res && res.identity) {
        this.setState({
          userName: res.username,
          identity: res.identity
        });
      } else {
        this.props.subscribeAuth(false);
      }
    });
  }

  componentDidUpdate(nextProps, nextState) {
    //检验登录是否过期
    console.log("basic--did--update---this.state.identity", this.state.identity);
    if (this.state.identity == false) {
      notification.warning({
        message: '登录信息已过期！',
        description: '请重新登录~',
        duration: 1.5,
        onClose: () => {
          this.props.subscribeAuth(false);
        }
      });
    }
  }

  render() {
    console.log("BasicLayout--render!!!");
    const { collapsed, userName } = this.state;
    const { subscribeAuth } = this.props;
    return (
      <div>
        <Layout>
          <GlobalHeader
            collapsed={collapsed}
            onCollapse={this.toggle}
            subscribeAuth={subscribeAuth}
            userName={userName}
          />
          <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
              <SiderMenu collapsed={collapsed} />
              <Content style={{padding: '0 24px',minHeight: 700 }}>
                <Switch>
                  {
                    getRouterData().map((route,index)=>(
                      <Route exact={route.exact} path={route.path} key={route.key||index} component={route.component} />
                    ))
                  }
                  <Redirect exact from="/" to="/userUpload" />
                  <Route component={NotFound} />
                </Switch>
              </Content>
          </Layout>
          </Content>
          <GlobalFooter copyright={copyright}/>
        </Layout>
      </div>
    );
  }

}