import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import resetPassword from './reset-password.module.css';
import {Button, EditIcon, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetNewPassword} from "../../services/actions/registration";
import {useAppDispatch, useAppSelector} from "../../utils/types";

const ResetPassword = () => {
    const user = useAppSelector(store => store.registration.user);
    const dispatch = useAppDispatch();
    const passwordRef = useRef<HTMLInputElement>(null);
    const [passwordReset, setPasswordReset] = useState('')
    const [keyInput, setKeyInput] = useState('')
    const history = useHistory();
    const location = useLocation();

    const inputPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPasswordReset(e.target.value);
    };

    const inputToken = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyInput(e.target.value);
    };

    const nextStepLogin = () => {
        history.replace({ pathname: '/login'});
    }

    const resetPasswordSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetNewPassword(passwordReset, keyInput))
        nextStepLogin()
    }

    // useEffect(() => {
    //     if (user) {
    //         (location.state && location.state.from) ? history.push(location.state.from.pathname) : history.push('/');
    //     }
    // }, [user, history, location]);

    return (
        <div className={resetPassword.block}>
            <h2 className={`${resetPassword.title} text text_type_main-medium`}>Восстановление пароля</h2>
            <form className={resetPassword.form} onSubmit={resetPasswordSubmit}>
                <div className={'mt-6 mb-6'}>
                    <Input
                        placeholder='password'
                        type='password'
                        icon='EditIcon'
                        error={false}
                        errorText='Ошибка'
                        onChange={inputPassword}
                        value={passwordReset}
                        ref={passwordRef}
                        name='password'
                        size='default'
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        type='text'
                        placeholder='Введите код из письма'
                        onChange={inputToken}
                        value={keyInput}
                        name='text'
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </form>
            <span className={'text text_type_main-default text_color_inactive mt-20'}>Вспомнили пароль?
                <Link className={resetPassword.link} to={'/login'}>Войти</Link>
            </span>
        </div>
    )
}

export default ResetPassword;