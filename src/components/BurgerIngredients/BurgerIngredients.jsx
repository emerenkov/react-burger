import React, {useContext, useEffect} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './BurgerIngredients.module.css';
import IngredientsBlock from "../IngridientsBlock/IngredientsBlock";
import Categories from "../../utils/categories";
import {useInView} from 'react-intersection-observer'
import {useSelector} from "react-redux";


const BurgerIngredients = () => {

    const ingredients = useSelector(store => store.burgerIngredientReducer.ingredients);

    const buns = ingredients.filter(element => element.type === Categories.Bun.type);
    const mains = ingredients.filter(element => element.type === Categories.Main.type);
    const sauces = ingredients.filter(element => element.type === Categories.Sauce.type);

    const [current, setCurrent] = React.useState('bun')

    const [bunRef, inViewBun] = useInView({ threshold: 1 });
    const [sauceRef, inViewSauce] = useInView({ threshold: 0.5 });
    const [mainRef, inViewMain] = useInView({ threshold: 0.2 });

    useEffect(() => {
        if (inViewBun) {
            setCurrent('bun');
        } else if (inViewSauce) {
            setCurrent('sauce');
        } else if (inViewMain) {
            setCurrent('main');
        }
    }, [inViewBun, inViewSauce, inViewMain]);

    const onTabClick = (tab) => {
        setCurrent(tab);
        const element = document.getElementById(tab);
        if (element) element.scrollIntoView({ behavior: "smooth" });
    };

    return(
        <section className={`${burgerIngredientsStyles.section} mr-5`}>
            <h1 className={`${burgerIngredientsStyles.title} 
            mt-10 mb-5 text text_type_main-default`}>Соберите бургер
            </h1>

            <div className={`${burgerIngredientsStyles.tab} mb-2`}>
                <a className={burgerIngredientsStyles.link} href="#bun">
                    <Tab value={"bun"} active={current === 'bun'} onClick={onTabClick} inViewBun={inViewBun}>
                        Булки
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.link} href="#sauce">
                    <Tab value={"sauce"} active={current === 'sauce'} onClick={onTabClick} inViewBun={inViewSauce}>
                        Соусы
                    </Tab>
                </a>
                <a className={burgerIngredientsStyles.link} href="#main">
                    <Tab value={"main"} active={current === 'main'} onClick={onTabClick} inViewBun={inViewMain}>
                        Начинки
                    </Tab>
                </a>
                </div>
            <article className={burgerIngredientsStyles.article} >
                <a name='bun'>
                <IngredientsBlock categories={buns} type={Categories.Bun} ref={bunRef}/>
                </a>
                <a name='sauce'>
                <IngredientsBlock categories={sauces} type={Categories.Sauce} ref={sauceRef}/>
                </a>
                <a name='main'>
                <IngredientsBlock categories={mains} type={Categories.Main} ref={mainRef}/>
                </a>
            </article>
        </section>
    )
}

export default BurgerIngredients;