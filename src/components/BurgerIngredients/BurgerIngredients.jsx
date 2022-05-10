import React from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsBlock from "../IngridientsBlock/IngredientsBlock";
import categories from "../../utils/categories";


const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('one')
    return(
        <section className={`${burgerIngredientsStyles.section} mr-5`}>
            <h1 className={`${burgerIngredientsStyles.title} 
            mt-10 mb-5 text text_type_main-default`}>Соберите бургер
            </h1>

            <div className={`${burgerIngredientsStyles.tab} mb-2`}>
                <a className={burgerIngredientsStyles.link} href="#bun">
                    <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.link} href="#sauce">
                    <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.link} href="#main">
                    <Tab value="main" active={current === 'main'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </a>
                </div>
            <article className={burgerIngredientsStyles.article} >
                {categories.map(e => (
                <IngredientsBlock key={e.type} type={e.type} text={e.text}/>
                    ))}
            </article>
        </section>
    )
}

export default BurgerIngredients;