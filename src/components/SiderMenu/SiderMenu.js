import React from "react";
import PropTypes from 'prop-types';
import styles from "./index.less";
import {
  Button
} from "antd";
import Result from 'ant-design-pro/lib/Result';
export default class SiderMenu extends React.Component {
  render() {
    return (
      <ul className={styles.menu}>
        <li className={styles.li}>Dashboard</li>
        <li>表单</li>
        <li>登录</li>
        <a href="">nihao</a>
        <Button type="primary">ENEN</Button>
        <Result type="success" />
      </ul>
    );
  }
}