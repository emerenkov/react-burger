import React, {useState} from 'react';
import loginStyles from './login.module.css';
import {EmailInput, PasswordInput, Button, EditIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginInputEmail = (e) => {
        setEmail(e.target.value);
    }
    const loginInputPassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className={loginStyles.block}>
            <h2 className={`${loginStyles.title} text text_type_main-medium`}>Вход</h2>
            <form className={loginStyles.form}>
                <div className={'mt-6 mb-6'}>
                    <EmailInput
                        placeholder='email'
                        name='email'
                        type='email'
                        onChange={loginInputEmail}
                        value={email}
                        error={false}
                        errorText='Ошибка'
                        size='default'
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        placeholder='password'
                        type='password'
                        icon={EditIcon}
                        error={false}
                        errorText='Ошибка'
                        onChange={loginInputPassword}
                        value={password}
                        name='password'
                        size='default' />
                </div>
                <Button type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <span className={'text text_type_main-default text_color_inactive mt-20'}>Вы — новый пользователь?
                <Link className={loginStyles.link} to={'/'}>Зарегистрироваться</Link>
            </span>
            <span className={'text text_type_main-default text_color_inactive mt-4'}>Забыли пароль?
                <Link className={loginStyles.link} to={'/'}>Восстановить пароль</Link>
            </span>
        </div>
    )
}

export default Login;