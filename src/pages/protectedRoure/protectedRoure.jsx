import React, {useEffect} from 'react';
import {Redirect, Route, useHistory, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({ onlyAuth = false, children, ...rest }) {
    const user = useSelector(store => store.registration.user);
    const isAuth = useSelector(store => store.registration.auth)
    const location = useLocation();

    if(!isAuth) {
        return (
            <Route>
                <Redirect to={'/login'} />
            </Route>
        )
    }

    if(onlyAuth && user) {
        const {from} =location.state || {from: {pathname: '/'}};

        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        )
    }

    if (!onlyAuth && !user) {
        return (
            <Route {...rest}>
                <Redirect to={{pathname: 'login', state: {from: location}}} />
            </Route>
        )
    }
    
    return (
        <Route {...rest}>
            {children}
        </Route>
    )
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
