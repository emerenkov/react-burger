import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import ConstructorBlock from "../ConstructorBlock/ConstructorBlock";

import categories from "../../utils/categories";


const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    return(
        <section className={`${burgerIngredientsStyles.section} mr-5`}>
            <h1 className={`${burgerIngredientsStyles.title} 
            mt-10 mb-5 text text_type_main-default`}>Соберите бургер
            </h1>

            <div className={`${burgerIngredientsStyles.tab} mb-2`}>
                <Tab value="one" active={current === 'one'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <article >
                {categories.map(e => (
                <ConstructorBlock key={e.type} type={e.type} text={e.text}/>
                    ))}
            </article>
        </section>
    )
}

export default BurgerIngredients;