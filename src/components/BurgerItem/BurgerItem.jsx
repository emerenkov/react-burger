import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from './BurgerItem.module.css'
import PropTypes from 'prop-types';


const BurgerItem = (props) => {
    return (
        <>
        <li className={ConstructorStyle.items}>
            <DragIcon type="primary" className={'pr-10'} />
            <ConstructorElement
                text={props.name}
                price={props.price}
                thumbnail={props.image_mobile}
                />
        </li>
    </>
    )
}

BurgerItem.propTypes = {
        image_mobile: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
};

export default BurgerItem;
