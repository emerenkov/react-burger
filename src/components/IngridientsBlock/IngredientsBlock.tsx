import React, {forwardRef} from 'react';
import IngredientsBlockStyle from './IngridientsBlock.module.css';
import Ingredient from "../Ingredient/Ingredient";
import {TIngredientsCategory} from "../../utils/types";

const ConstructorBlock = forwardRef<HTMLUListElement, TIngredientsCategory>(({ categories, type }, ref) => {

    return (
        <div  >
            <h2 className={`${IngredientsBlockStyle.titleList}
                    pt-8 text text_type_main-default`}>{type.text}</h2>
            <ul className={`${IngredientsBlockStyle.columns} pl-1`} ref={ref}>
                {categories.map(element => (
                    <li key={element._id} className={`${IngredientsBlockStyle.items} mt-6 mb-4 ml-2 mr-2`}>
                    <Ingredient ingredient={element}  />
                    </li>
                ))}
             </ul>
         </div>
    )
})

export default ConstructorBlock;