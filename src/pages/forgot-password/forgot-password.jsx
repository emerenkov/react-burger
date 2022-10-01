import React, {useEffect, useRef, useState} from 'react';
import forgotPasswordStyles from './forgot-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {resetPasswordEmail} from "../../services/actions/registration";

const ForgotPassword = () => {
    const user = useSelector(store => store.registration.user);
    const dispatch = useDispatch();
    const [email, setEmailForgot] = useState('');
    const ref = useRef(null);
    const history = useHistory();
    const location = useLocation();

    const inputEmail = (e) => {
        setEmailForgot(e.target.value)
    }

    const nextStepResetPassword = () => {
        history.replace({ pathname: '/reset-password'});
    }

    const forgotPasswordRequest = (e) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        dispatch(resetPasswordEmail(email));
        setEmailForgot('');
        nextStepResetPassword();
    }

    // useEffect(() => {
    //     if (user) {
    //         (location.state && location.state.from) ? history.push(location.state.from.pathname) : history.push('/');
    //     }
    // }, [user, history, location]);

    return (
        <div className={forgotPasswordStyles.block}>
            <h2 className={`${forgotPasswordStyles.title} text text_type_main-medium`}>Восстановление пароля</h2>
            <form className={forgotPasswordStyles.form} onSubmit={forgotPasswordRequest}>
                <div className={'mt-6 mb-6'}>
                    <Input
                        type='text'
                        placeholder='Укажите email'
                        onChange={inputEmail}
                        value={email}
                        name='email'
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        ref={ref}
                    />
                </div>
                <Button disabled={!(email)} htmlType="submit" type="primary" size="medium" >
                    Восстановить
                </Button>
            </form>
            <span className={'text text_type_main-default text_color_inactive mt-20'}>Вспомнили пароль?
                <Link className={forgotPasswordStyles.link} to={'/login'}>Войти</Link>
            </span>
        </div>
    )
}

export default ForgotPassword;