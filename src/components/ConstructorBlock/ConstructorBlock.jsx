import React from 'react';
// import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorBlockStyle from './ConstructorBlock.module.css';
import ConstructorElement from "../ConstructorElement/ConstructorElement";
import top from '../../utils/array';
import PropTypes from 'prop-types';


const ConstructorBlock = (props) => {
    const newArr = top.filter(el => (el.type === props.type))
    return (
        <div >
            <h2 className={`${ConstructorBlockStyle.titleList}
                    pt-8 text text_type_main-default`}>{props.text}</h2>
            <ul className={`${ConstructorBlockStyle.columns} pl-1`}>
                {newArr.map(element => (
                    <ConstructorElement key={element._id} {...element}/>
                ))}
            </ul>
        </div>
    )
}
ConstructorBlock.propTypes = {
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
}
export default ConstructorBlock;