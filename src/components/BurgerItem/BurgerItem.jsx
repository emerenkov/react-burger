import React from "react";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorStyle from './BurgerItem.module.css'
import PropTypes from 'prop-types';
import types from '../../utils/types.js'


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
    props: PropTypes.arrayOf(types.isRequired)
}

export default BurgerItem;
