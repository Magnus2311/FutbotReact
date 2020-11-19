import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import './custom.css'
import Registration from './components/Pages/Auth/Registration';
import Login from './components/Pages/Auth/Login';
import { AuthenticatedRoute } from './components/Pages/Auth/AuthenticatedRoute';
import { AuthContext } from './components/Common/Contexts/AuthContext';
import { authenticate } from './services/auth/authenticate';
import { User } from './interfaces/Models';
import Index from './components/Pages/Auth/Index';
import AddEaAccount from './components/Pages/EaAccounts/AddEaAccount';
import AllEaAccouts from './components/Pages/EaAccounts/AllEaAccouts';
import { connect } from 'react-redux';
import * as eaAccountsActions from "./store/EaAccounts"

const App: React.FunctionComponent<any> = ({onLoadUser}) => {
    const [user, setUser] = React.useState<User>({} as User);
    React.useEffect(() => {
        authenticate().then(userRes => setUser(userRes));
        onLoadUser(user);
    
    }, []);
    return <AuthContext.Provider value={{user: user, setUser: setUser}}>
        <Layout>
            <AuthenticatedRoute Component={Home} exact={true} path="/" />
            <AuthenticatedRoute Component={Index} exact path="/auth/index" />
            <AuthenticatedRoute Component={AddEaAccount} exact path="/ea/add" />
            <AuthenticatedRoute Component={AllEaAccouts} exact path="/ea/all" />
            <Route path='/auth/registration' component={Registration} />
            <Route path='/auth/login' component={Login} />
            </Layout>
    </AuthContext.Provider>;
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoadUser: (user: User) => { 
            dispatch(eaAccountsActions.actionCreators.loadEaAccounts(user))  
        }
    }
}

export default connect(undefined, mapDispatchToProps)(App);
