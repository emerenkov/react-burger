import React, {useState, useEffect, useCallback} from 'react';
import AddHeader from '../AppHeader/AppHeader';
import appStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {useSelector, useDispatch} from "react-redux";
import {getAllIngredients} from "../../services/actions/allIngredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {closeModalIngredient, openModelIngredient} from "../../services/actions/ingredient";
import {closeWindowOrder} from "../../services/actions/order";
import { Route, Switch, useHistory, useLocation} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { getDataUser, updateUserToken } from '../../services/actions/registration';
import { getCookie } from "../../utils/cookie";
import {ProtectedRoute} from "../../pages/protectedRoure/protectedRoure";


const App = () => {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.burgerIngredientReducer)
    const  orderReducer  = useSelector(store => store.orderReducer.orderNumber);

    const user = useSelector(store => store.registration.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state?.background;
    console.log('background',background);
    const cookie = getCookie('token');
    const refreshToken = localStorage.getItem('token');
    const getTokenSuccess = useSelector(store => store.registration.getTokenSuccess)
    console.log('getTokenSuccess',getTokenSuccess);


    useEffect(() => {
        dispatch(getAllIngredients())
    }, [dispatch]);

    // const openModelIngredient = useSelector(store => store.ingredientReducer.openDetailsModal)

    const handleCloseOrder = () => {
        dispatch(closeWindowOrder());
        history.replace('/');
    };

    const openOrderDetails = () => {
        if (!user) {
            history.replace('/login')
        }
    }

    useEffect(() => {
        if (!user && refreshToken && cookie ) {
            dispatch(getDataUser());
        }
        if (!cookie && getTokenSuccess) {
            dispatch(updateUserToken());
        }
        if (cookie && getTokenSuccess && refreshToken && !user) {
            dispatch(getDataUser());
        }
    }, [dispatch, getTokenSuccess, refreshToken, cookie, user])

    return(
        <div className={appStyles.app}>

            <AddHeader />
            <>
                <Switch location={background || location}>
                    <Route exact path={'/'}>
                {!ingredientsFailed && !ingredientsRequest &&(
                    <main className={appStyles.main}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor onClick={openOrderDetails}/>
                        </DndProvider>
                    </main>
                )}
                    </Route >
                    <Route exact path={'/login'}>
                        <Login />
                    </Route>
                    <Route exact path={'/register'}>
                        <Register />
                    </Route>
                    <Route exact path={'/forgot-password'}>
                        <ForgotPassword />
                    </Route>
                    <Route exact path={'/reset-password'}>
                        <ResetPassword />
                    </Route>
                    <ProtectedRoute exact path={'/profile'}>
                        <Profile />
                    </ProtectedRoute>
                    <Route path={'/ingredients/:id'}>
                        <IngredientDetails />
                    </Route>
                </Switch>

            { background && (
                <Route path='/ingredients/:id'>
                <Modal title="Детали ингредиентов" onClose={handleCloseOrder}>
                    <IngredientDetails />
                </Modal>
                </Route>
            )}
            </>
                {orderReducer && (
                    <Modal title="Детали заказа" onClose={handleCloseOrder}>
                        <OrderDetails />
                    </Modal>
                )}
        </div>
    )
}


export default App;