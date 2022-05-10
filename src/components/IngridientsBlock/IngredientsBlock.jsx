import React from 'react';
// import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsBlockStyle from './IngridientsBlock.module.css';
import Ingredient from "../Ingredient/Ingredient";
import top from '../../utils/data';
import PropTypes from 'prop-types';
import types from "../../utils/types";


const ConstructorBlock = (props) => {
    const newArr = top.filter(el => (el.type === props.type))
    return (
        <div id={props.type} >
            <h2 className={`${IngredientsBlockStyle.titleList}
                    pt-8 text text_type_main-default`}>{props.text}</h2>
            <ul className={`${IngredientsBlockStyle.columns} pl-1`}>
                {newArr.map(element => (
                    <Ingredient key={element._id} {...element}/>
                ))}
            </ul>
        </div>
    )
}
ConstructorBlock.propTypes = {
    props: PropTypes.arrayOf(types.isRequired)
}
export default ConstructorBlock;