import {combineReducers} from "redux";
import {burgerIngredientReducer} from "./allIngredients";
import {burgerConstructorReducer} from "./ingredientsInConstructor";
import {ingredientReducer} from "./ingredient";
import {orderReducer} from "./order";
import {registration} from "./registration";
import {wsReducer} from "./wsActionReducer";
import {wsUserReducer} from "./wsUserReducer";


export const rootReducer = combineReducers({
    burgerIngredientReducer,
    burgerConstructorReducer,
    ingredientReducer,
    orderReducer,
    registration,
    wsReducer,
    wsUserReducer,
})