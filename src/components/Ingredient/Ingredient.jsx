import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsStyle from './Ingredient.module.css';
import PropTypes from 'prop-types';
import types from "../../utils/types";


const Ingredient = ({name, price, image_mobile}) => {
    return (
        <>
            <img className="ml-5 mr-5 mb-1" src={image_mobile} alt={'Булка'} />
            <div className={IngredientsStyle.price}>
                <span className={`${IngredientsStyle.span} 
                mr-2 text text_type_digits-default`}>{price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={`${IngredientsStyle.name} 
            mt-2 mb-5 text text_type_main-default`}>{name}</p>
            <Counter count={1} size="default" />
            </>
    )
}

Ingredient.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired
}

export default Ingredient;