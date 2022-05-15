import React from 'react';
import AddHeader from '../AppHeader/AppHeader';
// import {} from '@ya.praktikum/react-developer-burger-ui-components';
import appStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import {api, parseResponse} from "../../utils/api";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const App = () => {

    function getData () {
        fetch(`${api.url}`)
            .then(parseResponse)
            // .then((json) => console.log(json.data))
            .then((json) => {setIngredients(json.data)})
            .catch(err => {console.log(err)});
    }

    React.useEffect(() => {
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
    }



    const [ingredients, setIngredients] = React.useState([])

    const [isOrderDetailsOpened, setIsOrderDetailsOpened] = React.useState(false);
    const [isIngredientDetailsOpened, setIsIngredientDetailsOpened] = React.useState(false);
    const [ingredientInModal, setIngredientInModal] = React.useState({ });
    return(
        <div className={appStyles.app}>
            <AddHeader />
            <main className={appStyles.main}>
                <BurgerIngredients  ingredients={ingredients} openModalIngredient={openModalIngredientDetails}/>
                <BurgerConstructor ingredients={ingredients} openModalOrder={openModalOrderDetails}/>
            </main>
            {isOrderDetailsOpened && (
                <Modal title="Детали заказа" onClose={closeAllModals}>
                    <OrderDetails />
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