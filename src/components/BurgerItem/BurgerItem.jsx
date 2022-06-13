import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from './BurgerItem.module.css'
import PropTypes from 'prop-types';
import types from '../../utils/types.js'


const BurgerItem = ({name, price, image_mobile}) => {
    return (
        <>
        <li className={ConstructorStyle.items}>
            <DragIcon type="primary" className={'pr-10'} />
            <ConstructorElement
                text={name}
                price={price}
                thumbnail={image_mobile}
                />
        </li>
    </>
    )
}

BurgerItem.propTypes = {
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image_mobile: PropTypes.string.isRequired
}

export default BurgerItem;
