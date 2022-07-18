import { v4 as uuid } from 'uuid';

export const ADD_BUN = 'ADD_BUN';
export const RESET_INGREDIENT = 'RESET_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';


export function addBun(item) {
    return {
        type: ADD_BUN,
        item: {
            ...item,
            uId: uuid()
        }
    };
}

export function deleteItem (item) {
    return {
        type: DELETE_INGREDIENT,
        item,
    };
}

export function resetItem (dragIndex, hoverIndex) {
    return {
        type: RESET_INGREDIENT,
        dragIndex,
        hoverIndex
    };
}


