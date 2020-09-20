import React, { useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { Context } from '../Store/Provider';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { mounted, setMount, authenticated } = useContext(Context);

    useEffect(() => {
        setMount(true);
    }, [setMount]);

    if(!mounted)
        return <h2>Please wait. The page is loading...</h2>

    return(
        <Route {...rest} render={props => (
            authenticated ?
            <Component />
                :
            <Redirect to="/signin" />
        )} />
    );
}