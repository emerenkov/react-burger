import React, {useState, useEffect, useCallback} from 'react';
import AddHeader from '../AppHeader/AppHeader';
// import {} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from "react-redux";
import {getAllIngredients} from "../../services/actions/allIngredients";
import {burgerIngredientReducer} from "../../services/reducers/allIngredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {ingredientReducer} from "../../services/reducers/ingredient";
import {closeModalIngredient, openModelIngredient} from "../../services/actions/ingredient";
import {closeWindowOrder} from "../../services/actions/order";
import {orderReducer} from "../../services/reducers/order";


const App = () => {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.burgerIngredientReducer)

    const  orderReducer  = useSelector(store => store.orderReducer.orderNumber);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

    const openModelIngredient = useSelector(store => store.ingredientReducer.openModelIngredient)

    const handleCloseOrder = useCallback(() => {
        dispatch(closeWindowOrder());
    }, [dispatch]);

    const handleDetailsModal = useCallback(() => {
        dispatch(closeModalIngredient());
    }, [dispatch]);

    return(
        <div className={appStyles.app}>
            <AddHeader />
            {!ingredientsFailed && !ingredientsRequest &&(
                <main className={appStyles.main}>
                    <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients />
                        <BurgerConstructor />
                    </DndProvider>
                </main>
            )}
            {orderReducer && (
                <Modal title="Детали заказа" onClose={handleCloseOrder}>
                    <OrderDetails />
                </Modal>
            )}
            {openModelIngredient && (
                <Modal title="Детали ингредиентов" onClose={handleDetailsModal}>
                    <IngredientDetails ingredient={openModelIngredient} />
                </Modal>
            )}
        </div>
    )
}


export default App;