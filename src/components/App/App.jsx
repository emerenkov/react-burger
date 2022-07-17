import React, {useState, useEffect} from 'react';
import AddHeader from '../AppHeader/AppHeader';
// import {} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {api, parseResponse, getData, setData} from "../../utils/api";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { DataContext } from '../../services/dataContext';
import {useSelector, useDispatch} from "react-redux";
import {getAllIngredients} from "../../services/actions/allIngredients";
import {burgerIngredientReducer} from "../../services/reducers/allIngredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App = () => {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.burgerIngredientReducer)

    const [ingredients, setIngredients] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

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
            {!ingredientsFailed && !ingredientsRequest &&(
                <main className={appStyles.main}>
                    <DataContext.Provider value={{ ingredients, setIngredients }}>
                        <DndProvider backend={HTML5Backend}>
                        <BurgerIngredients openModalIngredient={openModalIngredientDetails}/>
                        <BurgerConstructor openModalOrder={openModalOrderDetails}/>
                        </DndProvider>
                    </DataContext.Provider>
                </main>
            )}
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