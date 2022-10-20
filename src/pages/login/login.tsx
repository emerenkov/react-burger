import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import loginStyles from './login.module.css';
import { PasswordInput, Button, Input} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import {authorizationUser} from "../../services/actions/registration";
import {useAppDispatch, useAppSelector} from "../../utils/types";

const Login: FC = () => {
    const error = useAppSelector(store => store.registration.error);
    const dispatch = useAppDispatch();

    const [emailLogin, setEmailLogin] = useState('')
    const [passwordLogin, setPasswordLogin] = useState('')

    const loginInputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailLogin(e.target.value);
    }
    const loginInputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordLogin(e.target.value);
    }

    const loginSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authorizationUser(emailLogin, passwordLogin));
    };

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
                        onChange={loginInputPassword}
                        value={passwordLogin}
                        name='password'
                        size='default'
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