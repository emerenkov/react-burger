import { TIngredient } from '../../utils/types';

export const OPEN_WINDOW_INGREDIENT: 'OPEN_WINDOW_INGREDIENT' = 'OPEN_WINDOW_INGREDIENT';
export const CLOSE_WINDOW_INGREDIENT: 'CLOSE_WINDOW_INGREDIENT' = 'CLOSE_WINDOW_INGREDIENT';

export type TIngredientModalActions =
    IClickOnIngredientModalAction
    | ICloseOnIngredientModalAction;

export interface IClickOnIngredientModalAction {
    type: typeof OPEN_WINDOW_INGREDIENT;
    payload: TIngredient;
}

export interface ICloseOnIngredientModalAction {
    type: typeof CLOSE_WINDOW_INGREDIENT;
}

export const openModelIngredient = (payload: TIngredient): IClickOnIngredientModalAction => ({
    type: OPEN_WINDOW_INGREDIENT,
    payload
});

export const closeModalIngredient = (): ICloseOnIngredientModalAction => ({
    type: CLOSE_WINDOW_INGREDIENT,
});