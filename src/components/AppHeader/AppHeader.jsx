import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css';
import { NavLink } from 'react-router-dom';
import {useSelector} from "react-redux";

const AddHeader = () => {
    const user = useSelector(store => store.registration.user);
    const auth = user ? user.email : 'Личный кабинет'
    return(
        <header className={`${appHeaderStyles.header} mt-4`}>
            <nav className={`${appHeaderStyles.navigation} pt-4 pb-4`} >
                <menu className={appHeaderStyles.menu}>
                    <li className={`${appHeaderStyles.item} mr-7 ml-5`}>
                        <NavLink className={`${appHeaderStyles.links} `}
                                activeClassName={appHeaderStyles.linkActive} exact to='/'>
                            <BurgerIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">Конструктор</span>
                        </NavLink>
                    </li>
                    <li className={`${appHeaderStyles.item} mr-30 ml-5 `}>
                        <NavLink className={`${appHeaderStyles.links} `}
                                 activeClassName={appHeaderStyles.linkActive} exact to='/feed'>
                            <ListIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">Лента заказов</span>
                        </NavLink>
                    </li>
                    <li className={`${appHeaderStyles.item} ml-3 mr-30`}>
                        <Logo />
                    </li>
                    <li className={`${appHeaderStyles.item} ${appHeaderStyles.item}  ml-30 pl-15`}>
                        <NavLink className={`${appHeaderStyles.links} `}
                                 activeClassName={appHeaderStyles.linkActive} to='/profile'>
                            <ProfileIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">{auth}</span>
                        </NavLink>
                    </li>
                </menu>

            </nav>
        </header>
    )
}

export default AddHeader;
