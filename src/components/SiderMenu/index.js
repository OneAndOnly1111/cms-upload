import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.less';
import logo from '../../images/good.png';
import { getMenuData } from '../../common/menu';
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default class SiderMenu extends React.Component {
  /**
   * get SubMenu or Item
   */
  getNavMenuItems(menusData) {
    if (menusData) {
      return menusData.map(item => {
        if (item.children) {
          return (
            <SubMenu key={item.path} title={<span><Icon type={item.icon}></Icon><span>{item.name}</span></span>}>
              {item.children.map(child=><Menu.Item key={child.path}><Link to={child.path}><span>{child.name}</span></Link></Menu.Item>)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}><Icon type={item.icon} /><span>{item.name}</span></Link>
          </Menu.Item>
        );
      });
    }
  }

  render() {
    const { collapsed } = this.props;
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        width={256}
        className={styles.sider}
      >
        <div className={styles.logo} key="logo">
          <img src={logo} alt="logo" />
          <h1>控制台</h1>
        </div>
        <Menu
          key="Menu"
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ padding: '16px 0', width: '100%' }}
        >
          { this.getNavMenuItems(getMenuData()) }
        </Menu>
      </Sider>
    );
  }
}