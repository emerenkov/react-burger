import React, {useEffect, useState} from 'react';
import loginStyles from './login.module.css';
import { PasswordInput, Button, EditIcon, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authorizationUser} from "../../services/actions/registration";

const Login = () => {
    const user = useSelector(store => store.registration.user);
    const error = useSelector(store => store.registration.error);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();


    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const loginInputEmail = (e) => {
        setEmailLogin(e.target.value);
    }
    const loginInputPassword = (e) => {
        setPasswordLogin(e.target.value);
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(authorizationUser(emailLogin, passwordLogin));
    };

    // useEffect(() => {
    //     if (user) {
    //         (location.state && location.state.from)
    //             ? history.push(location.state.from.pathname)
    //             : history.push('/');
    //     }
    // }, [user, history, location]);


    // if (user) {
    //     return (
    //         <Redirect to={location?.state?.from.pathname || '/'} />
    //     );
    // }

    return (
        <div className={loginStyles.block}>
            {error &&
            <p className={loginStyles.text}>Некорректный пароль</p>
            }
            <h2 className={`${loginStyles.title} text text_type_main-medium`}>Вход</h2>
            <form className={loginStyles.form} onSubmit={loginSubmit}>
                <div className={'mt-6 mb-6'}>
                    <Input
                        type='email'
                        placeholder='E-mail'
                        onChange={loginInputEmail}
                        value={emailLogin}
                        name='email'
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        placeholder='password'
                        type='password'
                        icon={EditIcon}
                        error={error}
                        errorText='Ошибка'
                        onChange={loginInputPassword}
                        value={passwordLogin}
                        name='password'
                        size='default'
                        autocomplete="current-password"
                    />
                </div>
                <Button disabled={!(emailLogin && passwordLogin)} htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <span className={'text text_type_main-default text_color_inactive mt-20'}>Вы — новый пользователь?
                <Link className={loginStyles.link} to={'/register'}>Зарегистрироваться</Link>
            </span>
            <span className={'text text_type_main-default text_color_inactive mt-4'}>Забыли пароль?
                <Link className={loginStyles.link} to={'/forgot-password'}>Восстановить пароль</Link>
            </span>
        </div>
    )
}

export default Login;