import React from "react";
import { Layout, Icon, notification } from 'antd';
import { BrowserRouter as Router, Route, Switch, Redirect, withRouter, } from "react-router-dom";
import SiderMenu from "../components/SiderMenu";
import GlobalHeader from "../components/GlobalHeader";
import GlobalFooter from "../components/GlobalFooter";
import TextOne from "../components/Test";
import NotFound from "../components/Exception/404";
import { getRouterData } from "../common/route.js";
import { getCookie } from "../utils/utils";
import { queryUserInfo } from "../services/api";

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
    /*获取用户信息*/
    queryUserInfo().then((data) => {
      console.log("queryUserInfo--res", data);
      if (data.msg == "success") {
        this.setState({
          userName: data.data.user
        });
      }
    });
  }

  componentWillUpdate(nextProps, nextState) {
    /*检验登录是否过期*/
    if (!getCookie("sid")) {
      notification.warning({
        message: '登录信息已过期！',
        description: '请重新登录~',
        duration: 2,
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
          <SiderMenu
            collapsed={collapsed}
          />
          <Layout>
            <GlobalHeader
              collapsed={collapsed}
              onCollapse={this.toggle}
              subscribeAuth={subscribeAuth}
              userName={userName}
            />
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <Switch>
                {
                  getRouterData().map((route,index)=>(
                    <Route exact={route.exact} path={route.path} key={route.key||index} component={route.component} />
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