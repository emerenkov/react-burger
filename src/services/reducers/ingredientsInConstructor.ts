import update from 'immutability-helper';
import { ADD_BUN, RESET_INGREDIENT, DELETE_INGREDIENT, TIngredientConstructorActions } from '../actions/ingredientsInConstructor';
import {TIngredient} from "../../utils/types";

type TInitialState = {
    element: Array<TIngredient>;
    bun: TIngredient | null;
    productsId: Array<string>;
}

const initialState: TInitialState = {
    element: [],
    bun: null,
    productsId: [],
}

export const burgerConstructorReducer = (state = initialState, action: TIngredientConstructorActions): TInitialState => {
    switch (action.type) {
        case ADD_BUN:
            //если только булка
            if (action.item.type === 'bun') {
                if (state.bun) {
                    return {
                        ...state,
                        bun: action.item,
                        productsId: state.productsId.filter(id => id !== state?.bun?._id)    //id
                            .concat(action.item._id),
                    };
                } else {
                    return {
                        ...state,
                        bun: action.item,
                        productsId: [...state.productsId, action.item._id],                //id
                    };
                }
            }
            return {
                ...state,
                element: [...state.element, action.item ],
                productsId: [...state.productsId, action.item._id],                        //id
            };
        //Удаление ингредиента из выбранного списка
        case DELETE_INGREDIENT:
            return {
                ...state,
                element: [...state.element].filter(item => item.uId !== action.item.uId),
                productsId: [...state.productsId].filter(id => id !== action.item._id),      //id
            }
        //Перетаскивание ингредиентов в конструктор
        case RESET_INGREDIENT:
            return {
                ...state,
                element: update(state.element, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.element[action.dragIndex]],
                    ]
                })
            }
        default:
            return state;
    }
}
