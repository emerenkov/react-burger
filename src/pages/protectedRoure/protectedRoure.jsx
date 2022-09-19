import React from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import PropTypes from "prop-types";

export function ProtectedRoute({ children, ...rest }) {
    const user = useSelector(store => store.registration.user);
    const location = useLocation();

    // if (user) {
    //     return (
    //         <Redirect to={location?.state?.from.pathname || '/'} />
    //     );
    // }

    return (
        <Route
            {...rest}
            render={() =>
                // Если пользователь есть, используем компонент, который передан в ProtectedRoute
                ( user ? (
                    children
                ) : (
                    <Redirect
                        to={{pathname: '/login',
                        state: {from: location},
                        }}
                    />
                ))
            }
        />
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};
