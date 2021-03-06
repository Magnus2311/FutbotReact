import React, { FunctionComponent, useContext } from "react";
import { AuthContext } from "../../Common/Contexts/AuthContext";
import Login from "./Login";

type AuthenticateBeforeRenderProps = any;

const AuthenticateBeforeRender: FunctionComponent<AuthenticateBeforeRenderProps> = ({
  render,
}) => {
  const { user } = useContext(AuthContext);

  return user.username ? render() : <Login returnAfterLogin={render} />;
};

export default AuthenticateBeforeRender;
