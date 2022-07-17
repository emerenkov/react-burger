import React, {useContext, useMemo} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import BurgerItem from "../BurgerItem/BurgerItem";
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from "react-redux";
import types from "../../utils/types";
import { DataContext } from '../../services/dataContext';
import emptyBun from '../../images/empty.png'



const BurgerConstructor = ({ openModalOrder }) => {

    const element = useSelector(store => store.burgerConstructorReducer.element);
    const bun = useSelector(store => store.burgerConstructorReducer.bun);
    const productsId = useSelector(store => store.burgerConstructorReducer.productsId);

    const { ingredients } = useContext(DataContext);

    // get all ingredient without bun
    // const snack = ingredients.filter(el => (el.type !== 'bun'));
    //get bun only
    // const bun = ingredients.find(el => (el.type === 'bun'));

    const price = useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) +
            element.reduce((s, v) => s + v.price, 0)
        );
    }, [bun, element]);

    const dispatch = useDispatch();

    // const orderModal = (ids) => {
    //     dispatch(getOrder(ids));
    // }

    return(
        <section className={`${burgerConstructorStyles.section} pt-25 pl-4 ml-5`}>
            <div className={`${burgerConstructorStyles.block} mr-4 `}>
                {bun ? (
                    < ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + " (верх)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        key={`top:${bun._id}`}

                    />
                ) : ( <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Выберите булку из списка слева"
                        price={0}
                        thumbnail={emptyBun}
                    />
                )}
            </div>
            {!bun && <p className='text text_type_digits-default text_color_inactive pt-8 pl-10'>Выберите и перетащите слева начинки и соусы для бургера</p>}
            <ul className={`${burgerConstructorStyles.list} mr-1 pr-1`}>
                    {element && element.length > 0 && element.map(element, index => (
                        <BurgerItem
                            key={element._id}
                            index={index}
                            {...element}/>
                    ))}
                </ul>
            <div className={`${burgerConstructorStyles.block} mr-4 `}>
                {bun ? (
                    < ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + " (низ)"}
                        price={bun.price}
                        thumbnail={bun.image_mobile}
                        key={`top:${bun._id}`}

                    />
                ) : ( <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Выберите булку из списка слева"
                        price={0}
                        thumbnail={emptyBun}
                    />
                )}
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