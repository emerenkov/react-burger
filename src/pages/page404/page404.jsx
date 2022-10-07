import React from 'react'
import { Link } from 'react-router-dom';
import page404Styles from './page404.module.css'

export function Page404() {
    return (
        <div className={page404Styles.block}>
            <p className={`${page404Styles.text} text text_type_main-default`}>Ошибка 404 страница не найдена</p>
            <Link className={`${page404Styles.link} text text_type_main-default`} to={'/'}>Вернуться на главную страницу</Link>
        </div>
    )
}