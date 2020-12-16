import * as React from "react";
import { Route } from "react-router";
import Layout from "./components/Pages/Layout";
import "./custom.css";
import "./css/site.css";
import Registration from "./components/Pages/Auth/Registration";
import Login from "./components/Pages/Auth/Login";
import { AuthenticatedRoute } from "./components/Pages/Auth/AuthenticatedRoute";
import { AuthContext } from "./components/Common/Contexts/AuthContext";
import { authenticate } from "./services/auth/authenticate";
import { User } from "./interfaces/Models";
import Index from "./components/Pages/Auth/Index";
import AddEaAccount from "./components/Pages/EaAccounts/AddEaAccount";
import AllEaAccouts from "./components/Pages/EaAccounts/AllEaAccouts";
import IndexEaAccount from "./components/Pages/EaAccounts/Index";
import { connect } from "react-redux";
import Home from "./components/Pages/Home/Home";

const App: React.FunctionComponent<any> = () => {
  const [user, setUser] = React.useState<User>({} as User);
  React.useEffect(() => {
    authenticate().then((userRes) => setUser(userRes));
  }, []);
  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      <Layout>
        <AuthenticatedRoute Component={Home} exact={true} path="/" />
        <AuthenticatedRoute Component={Index} exact path="/auth/index" />
        <AuthenticatedRoute Component={AddEaAccount} exact path="/ea/add" />
        <AuthenticatedRoute Component={AllEaAccouts} exact path="/ea/all" />
        <AuthenticatedRoute
          Component={IndexEaAccount}
          exact
          path="/ea/account/:username"
        />
        <Route path="/auth/registration" component={Registration} />
        <Route path="/auth/login" component={Login} />
      </Layout>
    </AuthContext.Provider>
  );
};

export default connect(undefined)(App);
