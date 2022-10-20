import React, {FC, useMemo} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import BurgerItem from "../BurgerItem/BurgerItem";
import emptyBun from '../../images/empty.png'
import {getOrder} from "../../services/actions/order";
import {useDrop} from "react-dnd";
import {addBun, deleteItem} from "../../services/actions/ingredientsInConstructor";
import {useHistory} from "react-router-dom";
import {TIngredient, TModalOverlay, useAppDispatch, useAppSelector} from "../../utils/types";


const BurgerConstructor: FC<TModalOverlay> = () => {

    const element = useAppSelector(store => store.burgerConstructorReducer.element);
    const bun = useAppSelector(store => store.burgerConstructorReducer.bun);
    const productsId = useAppSelector(store => store.burgerConstructorReducer.productsId);
    const user = useAppSelector(store => store.registration.user);

    const price = useMemo(() => {
        return (
            (bun ? bun.price * 2 : 0) +
            element.reduce((s, v) => s + v.price, 0)
        );
    }, [bun, element]);

    const dispatch = useAppDispatch();
    const history = useHistory();

    const orderModal = (id: Array<string>) => {
        user && dispatch(getOrder(id));
        !user && history.push('/login');
    }

    const [{ isHover }, drop] = useDrop({
        accept: 'ingredient',
        drop({ ingredient}: {ingredient: TIngredient}) {
            dispatch(addBun(ingredient));
        },
        collect: (monitor) => ({
            isHover: monitor.canDrop(),
        }),
    });

    const handleDelete = (item: TIngredient) => {
        dispatch(deleteItem(item));
    }

    return(
        <section className={isHover
            ? `${burgerConstructorStyles.section} ${burgerConstructorStyles.overbun} pt-25 pl-4 ml-5`
            : `${burgerConstructorStyles.section} pt-25 pl-4 ml-5`}>
            <div className={`${burgerConstructorStyles.block} mr-4`} ref={drop} >
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
            <ul className={`${burgerConstructorStyles.list} mr-1 pr-1`} ref={drop}>
                    {element && element.length > 0 && element.map((el, index) => (
                        <BurgerItem
                            key={el.uId}
                            index={index}
                            el={el}
                            handleDelete={handleDelete}/>
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
            {/*</div>*/}
            </div>
            <div className={`${burgerConstructorStyles.cost} mt-10 mr-4`}>
            <p className={`text text_type_digits-medium mr-10`}>{price}
                <CurrencyIcon type="primary" />
            </p>
            <Button type="primary" size="large" onClick={() => {orderModal(productsId)}}>
                Оформить заказ
            </Button>
            </div>
        </section>
    )
}
// on 106 line Im deleted className='p-4'
export default BurgerConstructor;