import React from "react";
import styles from "./index.less";

export default class SiderMenu extends React.Component {
  render() {
    return (
      <ul className={styles.menu}>
        <li className={styles.li}>Dashboard</li>
        <li>表单</li>
        <li>登录</li>
        <a href="">nihao</a>
      </ul>
    );
  }
}