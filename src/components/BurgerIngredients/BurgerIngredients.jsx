import React, {useContext} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsBlock from "../IngridientsBlock/IngredientsBlock";
import Categories from "../../utils/categories";
import {sortItems} from "../../utils/utils";
import PropTypes from "prop-types";
import types from "../../utils/types";

import { DataContext } from '../services/dataContext';


const BurgerIngredients = ({ openModalIngredient }) => {

    const { ingredients } = useContext(DataContext);

    const buns = sortItems(Categories.Bun.type, ingredients);
    const mains = sortItems(Categories.Main.type, ingredients);
    const sauces = sortItems(Categories.Sauce.type, ingredients);

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
                <a name='bun'>
                <IngredientsBlock categories={buns} type={Categories.Bun} openModalIngredient={openModalIngredient}/>
                </a>
                <a name='main'>
                <IngredientsBlock categories={mains} type={Categories.Main} openModalIngredient={openModalIngredient}/>
                </a>
                <a name='sauce'>
                <IngredientsBlock categories={sauces} type={Categories.Sauce} openModalIngredient={openModalIngredient}/>
                </a>
            </article>
        </section>
    )
}

BurgerIngredients.propTypes = {

    openModalIngredient: PropTypes.func.isRequired
}

export default BurgerIngredients;