import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Pages/Layout';
import Home from './components/Pages/Home';
import Counter from './components/Pages/Counter';
import './custom.css'
import Registration from './components/Pages/Auth/Registration';

export default () => (
    <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/auth/registration' component={Registration} />
    </Layout>
);
