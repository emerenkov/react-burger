import React, {useEffect, useState} from 'react';
import registrationStyles from './register.module.css';
import {Input, EmailInput, PasswordInput, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Redirect, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registrationNewUser} from "../../services/actions/registration";

const Register = () => {
    const user = useSelector(store => store.registration.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [nameRegister, setNameRegister] = useState('');
    const [emailRegister, setEmailRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');

    const inputName = (e) => {
        setNameRegister(e.target.value)
    };

    const inputPassword = (e) => {
        setPasswordRegister(e.target.value)
    };

    const inputEmail = (e) => {
        setEmailRegister(e.target.value)
    };

    const registrationUserSubmit = (e) => {
        e.preventDefault();
        dispatch(registrationNewUser(emailRegister, passwordRegister, nameRegister))
    }

    // useEffect(() => {
    //     if (user) {
    //         (location.state && location.state.from) ? history.push(location.state.from.pathname) : history.push('/');
    //     }
    // }, [user, history, location]);

    return (
        <div className={registrationStyles.block}>
            <h2 className={`${registrationStyles.title} text text_type_main-medium`}>Регистрация</h2>
            <form className={registrationStyles.form} onSubmit={registrationUserSubmit}>
                <div className={'mt-6 mb-6'}>
                    <Input
                        type='text'
                        placeholder={'name'}
                        onChange={inputName}
                        value={nameRegister}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <Input
                        type='email'
                        placeholder='E-mail'
                        onChange={inputEmail}
                        value={emailRegister}
                        name='email'
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className={'mb-6'}>
                    <PasswordInput
                        name='password'
                        value={passwordRegister}
                        onChange={inputPassword}
                        icon='EditIcon'
                        size='default'
                        error={false}
                        errorText='Ошибка'
                        suggested='current-password'
                    />
                </div>
                <Button disabled={!(nameRegister && emailRegister && passwordRegister)} htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
                <span className={'text text_type_main-default text_color_inactive mt-20'}>Уже зарегистрированы?
                <Link className={registrationStyles.link} to={'/login'}>Войти</Link>
                </span>
        </div>
    )
}

export default Register;