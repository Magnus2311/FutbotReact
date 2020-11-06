import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import Counter from './components/Pages/Counter';
import './custom.css'
import Registration from './components/Pages/Auth/Registration';
import Login from './components/Pages/Auth/Login';
import { AuthenticatedRoute } from './components/Pages/Auth/AuthenticatedRoute';

export default () => (
    <Layout>
        <AuthenticatedRoute Component={Home} exact={true} path="/" />
        <Route path='/counter' component={Counter} />
        <Route path='/auth/registration' component={Registration} />
        <Route path='/auth/login' component={Login} />
    </Layout>
);
