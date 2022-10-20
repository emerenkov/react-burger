import React, {FC, ReactNode} from 'react';
import {Redirect, Route, useLocation} from 'react-router-dom';
import {useAppSelector, TProtectedRoute } from "../../utils/types";

export const ProtectedRoute: FC<TProtectedRoute> = ({ onlyAuth = false, children, ...rest }) => {
    const user = useAppSelector(store => store.registration.user);
    const location = useLocation<{from: string}>();

    if(onlyAuth && user) {
        const locations: any =location?.state?.from || {from: {pathname: '/'}};

        return (
            <Route {...rest}>
                <Redirect to={locations} />
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

