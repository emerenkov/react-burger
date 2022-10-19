import React, {ChangeEvent, FC, FormEvent, useRef, useState} from 'react';
import forgotPasswordStyles from './forgot-password.module.css';
import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, useHistory, useLocation} from "react-router-dom";
import { resetNewPassword } from "../../services/actions/registration";
import {useAppDispatch, useAppSelector} from "../../utils/types";

const ForgotPassword: FC = () => {
    const user = useAppSelector(store => store.registration.user);
    const dispatch = useAppDispatch();
    const [email, setEmailForgot] = useState('');
    const ref = useRef(null);
    const history = useHistory();
    const location = useLocation<{ from: string}>();

    const inputEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailForgot(e.target.value)
    }

    const nextStepResetPassword = () => {
        history.replace({ pathname: '/reset-password'});
    }

    const forgotPasswordRequest = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            return;
        }
        dispatch(resetNewPassword(email));
        setEmailForgot('');
        nextStepResetPassword();
    }

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