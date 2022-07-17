import React, {forwardRef} from 'react';
import IngredientsBlockStyle from './IngridientsBlock.module.css';
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import {openModelIngredient} from "../../services/actions/ingredient";
import {useDispatch, useSelector} from "react-redux";


const ConstructorBlock = forwardRef(({ categories, type }, ref) => {

    return (
        <div ref={ref} >
            <h2 className={`${IngredientsBlockStyle.titleList}
                    pt-8 text text_type_main-default`}>{type.text}</h2>
            <ul className={`${IngredientsBlockStyle.columns} pl-1`}>
                {categories.map(element => (
                    <li key={element._id} className={`${IngredientsBlockStyle.items} mt-6 mb-4 ml-2 mr-2`}>
                    <Ingredient ingredient={element} count={1} />
                    </li>
                ))}
            </ul>
        </div>
    )
})

ConstructorBlock.propTypes = {
    type: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
}

export default ConstructorBlock;