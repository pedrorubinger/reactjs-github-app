import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { StoreProvider } from './components/Store/Provider';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Repos from './pages/Repos';
import Followers from './pages/Followers';
import Following from './pages/Following';

export default function Routes() {
    return(
        <StoreProvider>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path="/" component= { Home } />
                    <PrivateRoute exact path="/repos" component= { Repos } />
                    <PrivateRoute exact path="/followers" component= { Followers } />
                    <PrivateRoute exact path="/following" component= { Following } />
                    <Route path="/signIn" component={ SignIn } />
                </Switch>
            </BrowserRouter>
        </StoreProvider>
    );
}