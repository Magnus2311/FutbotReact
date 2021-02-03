import * as React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavMenu from "./NavMenu";

export default class Layout extends React.PureComponent<
  {},
  { children?: React.ReactNode }
> {
  public render() {
    return (
      <React.Fragment>
        <NavMenu />
        <div className="container">{this.props.children}</div>
        <ToastContainer position="top-right" />
      </React.Fragment>
    );
  }
}
