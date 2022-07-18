export const OPEN_WINDOW_INGREDIENT = 'OPEN_WINDOW_INGREDIENT';
export const CLOSE_WINDOW_INGREDIENT = 'CLOSE_WINDOW_INGREDIENT';

export const openModelIngredient = (ingredient) => ({
    type: OPEN_WINDOW_INGREDIENT,
    payload: ingredient,
});

export const closeModalIngredient = () => ({
    type: CLOSE_WINDOW_INGREDIENT,
});