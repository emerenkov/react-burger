import React from 'react';
import IngredientsBlockStyle from './IngridientsBlock.module.css';
import Ingredient from "../Ingredient/Ingredient";
import PropTypes from 'prop-types';


const ConstructorBlock = ({categories, type, openModalIngredient}) => {

    return (
        <div >
            <h2 className={`${IngredientsBlockStyle.titleList}
                    pt-8 text text_type_main-default`}>{type.text}</h2>
            <ul className={`${IngredientsBlockStyle.columns} pl-1`}>
                {categories.map(element => (
                    <li key={element._id} onClick={() => openModalIngredient(element)} className={`${IngredientsBlockStyle.items} mt-6 mb-4 ml-2 mr-2`}>
                    <Ingredient {...element} onClick={openModalIngredient} />
                    </li>
                ))}
            </ul>
        </div>
    )
}

ConstructorBlock.propTypes = {
    type: PropTypes.object.isRequired,
    categories: PropTypes.array.isRequired,
    openModalIngredient: PropTypes.func.isRequired
}

export default ConstructorBlock;