import React, {useEffect, useRef, useState} from 'react';
import profileStyles from './profile.module.css';
import {NavLink, Route, Switch, useLocation} from "react-router-dom";
import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {checkUserAuth, getDataUser, logoutUser, updateUserInformation} from "../../services/actions/registration";
import {useDispatch, useSelector} from "react-redux";
import {dataUser} from "../../utils/api";
// import {ProfileData} from "../profileData/profileData";
// import {UserOrders} from "../userOrders/userOrders";

const Profile = () => {
    const user = useSelector(store => store.registration.user)
    const dispatch = useDispatch();

    const [nameProfile, setNameProfile] = useState(user.name);
    const [loginProfile, setLoginProfile] = useState(user.email);
    const [passwordProfile, setPasswordProfile] = useState('');

    const nameRef = useRef(null);
    const loginRef = useRef(null);

    useEffect(() => {
        const userr = dataUser();
        console.log(userr, 'user profile')
    }, [])

    const nameClick  = () => {
        setTimeout(() => nameRef.current.focus(), 0)
    }

    const loginClick  = () => {
        setTimeout(() => loginRef.current.focus(), 0)
    }

    const inputName = (e) => {
        setNameProfile(e.target.value);
    };

    const inputLogin = (e) => {
        setLoginProfile(e.target.value);
    };

    const inputPassword = (e) => {
        setPasswordProfile(e.target.value);
    };

    const logOut = () => {
        const outToken = localStorage.getItem('token');
        dispatch(logoutUser(outToken));
    }

    const saveSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserInformation(loginProfile, passwordProfile, nameProfile));
    }

    const cancelButton = (e) => {
        e.preventDefault();
        setNameProfile(user.name);
        setLoginProfile(user.email);
        setPasswordProfile('');
    }

    // useEffect(() => {
    //     // dispatch(getDataUser());
    //     dispatch(checkUserAuth());
    // }, [dispatch])

    return (
        <main className={profileStyles.block}>
            <nav className={'mr-15'}>
                <ul className={profileStyles.list}>
                    <li>
                        <NavLink className={`${profileStyles.menu} text text_type_main-medium`}
                                 activeClassName={profileStyles.menuActive} exact to='/profile'>
                            <span className="text text_type_main-medium">Профиль</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className={`${profileStyles.menu} text text_type_main-medium`}
                                 activeClassName={profileStyles.menuActive} to='/profile/orders'>
                            <span className="text text_type_main-medium">История заказов</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName={profileStyles.menuActive}
                            className={`${profileStyles.menu} text text_type_main-medium`} onClick={logOut} to='/login'>
                            <span className="text text_type_main-medium">Выход</span>
                        </NavLink>
                    </li>
                </ul>
                <p className={`${profileStyles.text} mt-20 text text_type_main-default text_color_inactive`}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <form className={profileStyles.form} onSubmit={saveSubmit}>
                <div className={'mt-6 mb-6'}>
                    <Input
                        type='text'
                        placeholder={'Имя'}
                        onChange={inputName}
                        onClick={nameClick}
                        ref={nameRef}
                        value={nameProfile}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        icon='EditIcon'
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        type='email'
                        placeholder='Логин'
                        onChange={inputLogin}
                        onClick={loginClick}
                        ref={loginRef}
                        value={loginProfile}
                        name='Login'
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        icon='EditIcon'
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        name='password'
                        value={passwordProfile}
                        onChange={inputPassword}
                        // onClick={passwordClick}
                        // ref={passwordRef}
                        icon='EditIcon'
                        size='default'
                        error={false}
                        errorText='Ошибка'
                        suggested='current-password'
                    />
                </div>
                <div>
                    <Button disabled={!(nameProfile && loginProfile && passwordProfile)} htmlType="submit" type="secondary" size="medium" onClick={cancelButton} >Отмена</Button>
                    <Button disabled={!(nameProfile && loginProfile && passwordProfile)} htmlType="submit" type="primary" size="medium">Сохранить</Button>
                </div>
            </form>
        </main>
        )
}

export default Profile;