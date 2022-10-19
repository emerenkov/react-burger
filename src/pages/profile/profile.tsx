import React, { useEffect, useRef, useState, FC, ChangeEvent, FormEvent, SyntheticEvent } from 'react';
import profileStyles from './profile.module.css';
import { NavLink } from "react-router-dom";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { logOut, updateUserInfo} from "../../services/actions/registration";
import { dataUser } from "../../utils/api";
import { useAppDispatch, useAppSelector } from "../../utils/types";

const Profile: FC = () => {
    const user = useAppSelector(store => store.registration.user)
    const dispatch = useAppDispatch();

    const [nameProfile, setNameProfile] = useState('');
    const [loginProfile, setLoginProfile] = useState('');
    const [passwordProfile, setPasswordProfile] = useState('');

    const nameRef = useRef<HTMLInputElement>(null);
    const loginRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const user = dataUser();
        console.log(user, 'user profile')
    }, [])

    const nameClick  = () => {
        setTimeout(() => nameRef.current && nameRef.current.focus(), 0)
    }

    const loginClick  = () => {
        setTimeout(() => loginRef.current && loginRef.current.focus(), 0)
    }

    const passwordClick = () => {
        setTimeout(() => passwordRef.current && passwordRef.current.focus(), 0)
    }

    const inputName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameProfile(e.target.value);
    };

    const inputLogin = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginProfile(e.target.value);
    };

    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordProfile(e.target.value);
    };

    const logOutUser = () => {
        const outToken = localStorage.getItem('token');
        outToken && dispatch(logOut(outToken));
    }

    const saveSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUserInfo(loginProfile, passwordProfile, nameProfile));
    }

    const cancelButton = (e: SyntheticEvent<Element, Event>) => {
        e.preventDefault();
        user && setNameProfile(user.name);
        user && setLoginProfile(user.email);
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
                            className={`${profileStyles.menu} text text_type_main-medium`} onClick={logOutUser} to='/login'>
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
                        onFocus={nameClick}
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
                        onFocus={loginClick}
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
                    <Input
                        type="password"
                        placeholder="Пароль"
                        name="password"
                        value={passwordProfile}
                        onChange={inputPassword}
                        ref={passwordRef}
                        onFocus={passwordClick}
                        icon="EditIcon"
                        size="default"
                        error={false}
                        errorText="Ошибка"
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