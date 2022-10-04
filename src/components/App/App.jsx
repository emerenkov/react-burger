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
// import {closeModalIngredient, openModelIngredient} from "../../services/actions/ingredient";
import {closeWindowOrder} from "../../services/actions/order";
import { Route, Switch, useHistory, useLocation} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { getDataUser, updateUserToken, checkUserAuth } from '../../services/actions/registration';
import { getCookie } from "../../utils/cookie";
import {ProtectedRoute} from "../../pages/protectedRoure/protectedRoure";
import {Page404} from "../../pages/page404/page404";
import {UserOrders} from "../../pages/userOrders/userOrders";
import {OrderIngredient} from "../../pages/orderIngredient/orderIngredient";
import {OrderIngredientId} from "../../pages/orderIngredientId/orderIngredientId";
import {Feed} from "../../pages/feed/feed";


const App = () => {
    const {ingredientsRequest, ingredientsFailed} = useSelector(store => store.burgerIngredientReducer)
    const  orderReducer  = useSelector(store => store.orderReducer.orderNumber);

    const user = useSelector(store => store.registration.user);
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state?.background;
    // const info = useSelector(store => store);
    // console.log('store',info);
    // const total = useSelector((state) => state);
    // console.log('state',total);

    const cookie = getCookie('token');
    const refreshToken = localStorage.getItem('token');
    const getTokenSuccess = useSelector(store => store.registration.getTokenSuccess)


    useEffect(() => {
        dispatch(getAllIngredients());

        dispatch(checkUserAuth());
    }, [dispatch]);

    // const openModelIngredient = useSelector(store => store.ingredientReducer.openDetailsModal)

    const handleCloseOrder = () => {
        dispatch(closeWindowOrder());
        history.goBack();
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
        if (!cookie && refreshToken) {
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
                    <ProtectedRoute onlyAuth={true} exact path={'/login'}>
                        <Login />
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={true} exact path={'/register'}>
                        <Register />
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={true} exact path={'/forgot-password'}>
                        <ForgotPassword />
                    </ProtectedRoute>
                    <ProtectedRoute onlyAuth={true} exact path={'/reset-password'}>
                        <ResetPassword />
                    </ProtectedRoute>
                    <ProtectedRoute exact path={'/profile'}>
                        <Profile />
                    </ProtectedRoute>
                    <ProtectedRoute exact path='/profile/orders'>
                        <UserOrders />
                    </ProtectedRoute>
                    <Route exact path='/profile/orders/:id'>
                        <OrderIngredientId />
                    </Route>
                    <Route path={'/ingredients/:id'}>
                        <IngredientDetails />
                    </Route>
                    <Route exact path='/feed'>
                        <Feed />
                    </Route>
                    <Route exact path='/feed/:id'>
                        <OrderIngredientId />
                    </Route>
                    <Route >
                        <Page404 />
                    </Route>
                </Switch>

            { background && (
                <>
                <Route path='/ingredients/:id'>
                <Modal title="Детали ингредиентов" onClose={handleCloseOrder}>
                    <IngredientDetails />
                </Modal>
                </Route>

                    <Route
                        path='/feed/:id'>
                        <Modal title='' onClose={handleCloseOrder}>
                            <OrderIngredient />
                        </Modal>
                    </Route>

                    <Route
                        path='/profile/orders/:id'>
                        <Modal title='' onClose={handleCloseOrder}>
                            <OrderIngredient />
                        </Modal>
                </Route>
                </>
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