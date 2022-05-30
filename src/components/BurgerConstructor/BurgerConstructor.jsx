import React, {useContext, useMemo} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import BurgerItem from "../BurgerItem/BurgerItem";
import PropTypes from 'prop-types';
import types from "../../utils/types";

import { DataContext } from '../services/dataContext';


const BurgerConstructor = ({ openModalOrder }) => {

    const { ingredients } = useContext(DataContext);

    // get all ingredient without bun
    const snack = ingredients.filter(el => (el.type !== 'bun'));
    //get bun only
    const bun = ingredients.find(el => (el.type === 'bun'));

    const price = useMemo(() => {
        return (
            (ingredients.bun ? ingredients.bun.price * 2 : 0) +
            ingredients.reduce((s, v) => s + v.price, 0)
        );
    }, [ingredients]);

    return(
        <section className={`${burgerConstructorStyles.section} pt-25 pl-4 ml-5`}>
            <div className={`${burgerConstructorStyles.block} mr-4 `}>
                {bun &&
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                }
            </div>
                <ul className={`${burgerConstructorStyles.list} mr-1 pr-1`}>
                    {snack.map(element => (
                        <BurgerItem key={element._id} {...element}/>
                    ))}
                </ul>
            <div className={`${burgerConstructorStyles.block} mr-4 `}>
                {bun &&
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                    />
                }
            </div>
            <div className={`${burgerConstructorStyles.cost} mt-10 mr-4`}>
            <p className={`text text_type_digits-medium mr-10`}>{price}
                <CurrencyIcon type="primary" className="p-4"/>
            </p>
            <Button type="primary" size="large" onClick={() => openModalOrder()}>
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}
BurgerConstructor.propTypes = {

    openModalOrder: PropTypes.func.isRequired
}

export default BurgerConstructor;