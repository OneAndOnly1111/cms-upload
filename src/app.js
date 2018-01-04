import React from "react";
import SiderMenu from "./components/SiderMenu/SiderMenu.js";
import "./styles/main.css";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SiderMenu />
      </div>
    );
  }
}