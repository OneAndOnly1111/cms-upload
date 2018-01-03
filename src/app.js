import React from "react";
import SiderMenu from "./components/SiderMenu/SiderMenu.js";
import "./styles/app.css";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SiderMenu />
      </div>
    );
  }
}