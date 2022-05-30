import React, {useState, useEffect} from 'react';
import AddHeader from '../AppHeader/AppHeader';
// import {} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {api, parseResponse} from "../../utils/api";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { DataContext } from '../services/dataContext';

const App = () => {

    const [ingredients, setIngredients] = useState([]);

    function getData () {
        return fetch(`${api.url}/ingredients`)
            .then(parseResponse)
            .then((json) => {setIngredients(json.data)})
            .catch(err => {console.log(err)});
    }

    const setData = () => {
        return fetch(`${api.url}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json;charset=utf-8",
            },
            body: JSON.stringify({"ingredients": ['60d3b41abdacab0026a733c6']})
        })
            .then(res => parseResponse(res))
            .then((orderNumber) => {
                setOrderNumber(orderNumber)
            })
            .catch((err) => setOrderNumber(null));
    }

    useEffect(() => {
        getData();
    }, []);

    // Close all model windows
    const closeAllModals = () => {
        setIsOrderDetailsOpened(false);
        setIsIngredientDetailsOpened(false);
    };

    // open model windows (ingredient) when use mouse 'click'
    const openModalIngredientDetails = (element) => {
        setIngredientInModal (element)
        setIsIngredientDetailsOpened(true);
    }

    // open model windows (order) when use mouse 'click'
    const openModalOrderDetails = () => {
        setIsOrderDetailsOpened(true)
        setData(orderNumber)
    }

    const [orderNumber, setOrderNumber] = React.useState({
        name: "",
        order: {
            number: ""
        },
        success: false
    })

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
    const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
    const [ingredientInModal, setIngredientInModal] = React.useState({ });
    return(
        <div className={appStyles.app}>
            <AddHeader />
            <main className={appStyles.main}>
                <DataContext.Provider value={{ ingredients, setIngredients }}>
                    <BurgerIngredients openModalIngredient={openModalIngredientDetails}/>
                    <BurgerConstructor openModalOrder={openModalOrderDetails}/>
                </DataContext.Provider>
            </main>
            {isOrderDetailsOpened && (
                <Modal title="Детали заказа" onClose={closeAllModals}>
                    <OrderDetails orderNumber={orderNumber} />
                </Modal>
            )}

            {isIngredientDetailsOpened && (
                <Modal title="Детали ингредиентов" onClose={closeAllModals}>
                    <IngredientDetails ingredient={ingredientInModal} />
                </Modal>
            )}
        </div>
    )
}


export default App;