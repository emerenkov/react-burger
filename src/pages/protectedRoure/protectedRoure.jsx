import React, {useEffect} from 'react';
import {Redirect, Route, useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {getAllIngredients} from "../../services/actions/allIngredients";
import {checkUserAuth, getDataUser} from "../../services/actions/registration";
import {getCookie} from "../../utils/cookie";
import {dataUser} from "../../utils/api";

export function ProtectedRoute({ onlyAuth = false, children, ...rest }) {
    const user = useSelector(store => store.registration.user);
    const isAuth = useSelector(store => store.registration.auth)
    const location = useLocation();
    const dispatch = useDispatch();
    // const user = checkUserAuth()

    const cookie = getCookie('token');

    if(onlyAuth && user) {
        console.log('user is true', user)
        const from =location?.state?.from || {from: {pathname: '/'}};

        return (
            <Route {...rest}>
                <Redirect to={from} />
            </Route>
        )
    }

    if (!onlyAuth && !user) {
        console.log('!user');
        return (
            <Route {...rest}>
                <Redirect to={{pathname: '/login', state: {from: location}}} />
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
