import React, {useEffect} from 'react';
import userOrdersStyles from './userOrders.module.css';
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import {logoutUser} from "../../services/actions/registration";
import {useDispatch} from "react-redux";
import {wsUserConnectionClosed, wsUserConnectionStart} from "../../services/actions/wsUser";
import {OrdersInfo} from "../orderInfo/orderInfo";

export function UserOrders() {
    const dispatch = useDispatch()
    const location = useLocation();
    const background = location.state?.background;

    useEffect(() => {
        dispatch(wsUserConnectionStart())
        return () => {
            dispatch(wsUserConnectionClosed())
        }
    }, [dispatch])


    const logOut = () => {
        const outToken = localStorage.getItem('token');
        dispatch(logoutUser(outToken));
    }

    return (
        <main className={userOrdersStyles.block}>
            <nav className={`${userOrdersStyles.nav} mr-15`}>
                <ul className={userOrdersStyles.list}>
                    <li>
                        <NavLink className={`${userOrdersStyles.menu} text text_type_main-medium`}
                                 activeClassName={userOrdersStyles.menuActive} exact to='/profile'>
                            <span className="text text_type_main-medium">Профиль</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`${userOrdersStyles.menu} text text_type_main-medium`}
                                 activeClassName={userOrdersStyles.menuActive} to='/profile/orders'>
                            <span className="text text_type_main-medium">История заказов</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={userOrdersStyles.menuActive}
                                 className={`${userOrdersStyles.menu} text text_type_main-medium`} onClick={logOut} to='/login'>
                            <span className="text text_type_main-medium">Выход</span>
                        </NavLink>
                    </li>
                </ul>
                <p className={`${userOrdersStyles.text} mt-20 text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <Switch location={background || location}>
                <Route exact path='/profile/orders'>
                    <div className={userOrdersStyles.container}>
                        <div className={`${userOrdersStyles.lists} pl-2 pr-2`}>
                            <OrdersInfo/>
                        </div>
                    </div>
                </Route>
            </Switch>
        </main>
    )
}