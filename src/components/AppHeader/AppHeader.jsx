import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import appHeaderStyles from './AppHeader.module.css';

const AddHeader = () => {
    return(
        <header className={`${appHeaderStyles.header} mt-4`}>
            <nav className={`${appHeaderStyles.navigation} pt-4 pb-4`} >
                <menu className={appHeaderStyles.menu}>
                    <li className={`${appHeaderStyles.item} mr-7 ml-5`}>
                        <a className={`${appHeaderStyles.links} `} href="#">
                            <BurgerIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">Конструктор</span>
                        </a>
                    </li>
                    <li className={`${appHeaderStyles.item} mr-30 ml-5 `}>
                        <a className={`${appHeaderStyles.links} `} href="#">
                            <ListIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">Лента заказов</span>
                        </a>
                    </li>
                    <li className={`${appHeaderStyles.item} ml-3 mr-30`}>
                        <Logo />
                    </li>
                    <li className={`${appHeaderStyles.item} ${appHeaderStyles.item}  ml-30 pl-15`}>
                        <a className={`${appHeaderStyles.links} `} href="#">
                            <ProfileIcon type="primary" />
                            <span className="ml-2 text text_type_main-default">Личный кабинет</span>
                        </a>
                    </li>
                </menu>

            </nav>
        </header>
    )
}

export default AddHeader;
