import React from "react";
import "./styles/main.css";
import { getMenuData } from './common/menu';
import { Layout, Menu, Icon } from 'antd';
import SiderMenu from "./components/SiderMenu";
import GlobalHeader from "./components/GlobalHeader";
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
		console.log("menuData", menuData)
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
            Content
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
		);
	}
}