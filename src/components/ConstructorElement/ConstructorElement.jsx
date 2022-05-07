import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorElementStyle from './ConstructorElement.module.css';



const ConstructorElement = (props) => {
    return (
        <li className={`${ConstructorElementStyle.items} mt-6 mb-4 ml-2 mr-2`}>
            <img className="ml-5 mr-5 mb-1" src={props.image} alt={'Булка'} />
            <div className={ConstructorElementStyle.price}>
                <span className={`${ConstructorElementStyle.span} 
                mr-2 text text_type_digits-default`}>{props.price}</span>

                <CurrencyIcon type="primary" />
            </div>
            <p className={`${ConstructorElementStyle.name} 
            mt-2 mb-5 text text_type_main-default`}>{props.name}</p>
            <Counter count={1} size="default" />
        </li>
    )
}

export default ConstructorElement;