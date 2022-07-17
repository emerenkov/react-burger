import update from 'immutability-helper';
import { ADD_BUN, RESET_INGREDIENT, DELETE_INGREDIENT } from '../actions/ingredientsInConstructor';

const initialState = {
    element: [],
    bun: null,
    productsId: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUN:
            if (action.item.type === 'bun') {
                if (state.bun) {
                    return {
                        ...state,
                        bun: action.item,
                        productsId: state.productsId.filter(id => id !== state.bun._id)
                            .concat(action.item._id),
                    };
                } else {
                    return {
                        ...state,
                        bun: action.item,
                        productsId: [...state.productsId, action.item._id],
                    };
                }
            }
            return {
                ...state,
                element: [...state.element, action.item ],
                productsId: [...state.productsId, action.item._id],
            };

        case DELETE_INGREDIENT:
            return {
                ...state,
                element: [...state.element].filter(item => item.uId !== action.item.uId),
                productsId: [...state.productsId].filter(id => id !== action.item._id),      //id
            }

        case RESET_INGREDIENT:
            return {
                ...state,
                element: update(state.element, {
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.element[action.dragItem]],
                    ]
                })
            }
        default:
            return state;
    }
}