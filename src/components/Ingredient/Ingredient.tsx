import React, {FC, useMemo} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsStyle from './Ingredient.module.css';
import {useDrag} from "react-dnd";
import {Link, useLocation} from "react-router-dom";
import { TIngredient, useAppSelector } from "../../utils/types";

export type TIngredients = {
    ingredient: TIngredient;
}

const Ingredient: FC<TIngredients> = ({ingredient}) => {
    const location = useLocation();

    // const handleOpenModal = (ingredient) => {
    //     dispatch(openModelIngredient(ingredient))
    // }

    const { bun, element } = useAppSelector(store => store.burgerConstructorReducer);

    const [{ isDrag }, dragRef] = useDrag(
        {
            type: 'ingredient',
            item: { ingredient },
            collect: (monitor) => ({
                isDrag: monitor.isDragging(),
            }),
        },
        [bun, element],
    );

    const setTotalCount = useMemo(() => {
        if (ingredient.type === 'bun') {
            return bun && ingredient._id === bun._id ? 2 : 0;
        }
        return element && element.filter((el) => el._id === ingredient._id).length;
    }, [bun, element, ingredient._id, ingredient.type]);

    return (
        <Link className={IngredientsStyle.link}
              to={{
                  pathname: `/Ingredients/${ingredient._id}`,
                  state: { background: location }
              }}>
            <div ref={dragRef} draggable>
                <img className="ml-5 mr-5 mb-1" src={ingredient.image} alt={ingredient.name} />
                <div className={IngredientsStyle.price}>
                    <span className={`${IngredientsStyle.span} 
                    mr-2 text text_type_digits-default`}>{ingredient.price}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <p className={`${IngredientsStyle.name} 
                mt-2 mb-5 text text_type_main-default`}>{ingredient.name}</p>
                {setTotalCount > 0 && <Counter count={setTotalCount} size="default" />}
                </div>
        </Link>
    )
}

// from line 51 cut onClick={handleOpenModal} style={{isDrag}}

export default Ingredient;