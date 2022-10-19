import React, { useEffect, FC} from 'react';
import AddHeader from '../AppHeader/AppHeader';
import AppStyles from './App.module.css';
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import {getIngredients} from "../../services/actions/allIngredients";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {closeOrderModal} from "../../services/actions/order";
import { Route, Switch, useHistory, useLocation} from "react-router-dom";
import Login from "../../pages/login/login";
import Register from "../../pages/register/register";
import ForgotPassword from "../../pages/forgot-password/forgot-password";
import ResetPassword from "../../pages/reset-password/reset-password";
import Profile from "../../pages/profile/profile";
import { getUserInfo, token, checkUserAuth } from '../../services/actions/registration';
import { getCookie } from "../../utils/cookie";
import {ProtectedRoute} from "../../pages/protectedRoure/protectedRoure";
import {Page404} from "../../pages/page404/page404";
import {UserOrders} from "../../pages/userOrders/userOrders";
import {OrderIngredient} from "../../pages/orderIngredient/orderIngredient";
import {OrderIngredientId} from "../../pages/orderIngredientId/orderIngredientId";
import {Feed} from "../../pages/feed/feed";
import {TLocation, useAppDispatch, useAppSelector} from "../../utils/types";

const App: FC = () => {
    const {ingredientsRequest, ingredientsFailed} = useAppSelector(store => store.burgerIngredientReducer)
    const  orderReducer  = useAppSelector(store => store.orderReducer.orderNumber);
    // type TOnlyAuth = {
    //     onlyAuth: boolean;
    // }
    // const onlyAuth: TOnlyAuth = false;
    const user = useAppSelector(store => store.registration.user);
    const dispatch = useAppDispatch();
    const location = useLocation<TLocation>();
    const history = useHistory();
    const background = location.state?.background;

    const cookie = getCookie('token');
    const refreshToken = localStorage.getItem('token');
    const getTokenSuccess = useAppSelector(store => store.registration.getTokenSuccess)

    useEffect(() => {
        dispatch(getIngredients());

        dispatch(checkUserAuth());
    }, [dispatch]);

    // const openModelIngredient = useSelector(store => store.ingredientReducer.openDetailsModal)

    const handleCloseOrder = () => {
        dispatch(closeOrderModal());
        history.goBack();
    };

    const openOrderDetails = () => {
        if (!user) {
            history.replace('/login')
        }
    }

    useEffect(() => {
        if (!user && refreshToken && cookie ) {
            dispatch(getUserInfo());
        }
        if (!cookie && refreshToken) {
            dispatch(token());
        }
        if (cookie && getTokenSuccess && refreshToken && !user) {
            dispatch(getUserInfo());
        }
    }, [dispatch, getTokenSuccess, refreshToken, cookie, user])

    return(
        <div className={AppStyles.app}>
            <AddHeader />
            <>
                <Switch location={background || location}>
                    <Route exact path={'/'}>
                {!ingredientsFailed && !ingredientsRequest &&(
                    <main className={AppStyles.main}>
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
                    <ProtectedRoute exact path='/profile/orders/:id'>
                        <OrderIngredientId />
                    </ProtectedRoute>
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