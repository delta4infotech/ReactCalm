import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    error:false,
    price: 4,
    purchasable: false,
    building:false,
}

const INGREDIENT_PRICES = {
    salad: 0.3,
    bacon: 0.6,
    cheese: 0.5,
    meat: 0.3
  };

const addIngredient = (state, action) => {
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
            const updatedIngredients = updatedObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                price: state.price + INGREDIENT_PRICES[action.ingredientName],
                building:true,
            }
            return updatedObject(state, updatedState);
}

const removeIngredient = (state, action) => {
   const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
            const updatedIngs = updatedObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                price: state.price + INGREDIENT_PRICES[action.ingredientName],
                building:true,
            }
            return updatedObject(state, updatedSt);
}

const setIngredients = (state, action) => {
    return updatedObject(state, {
        ingredients: action.ingredients,
        error: false,
        price: 4,
        building:false,
    });
}

const fetchIngredientsFailed = (state, action) => {
    return updatedObject(state, { error: true });
}

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);

        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
            
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action);
        
        case actionTypes.FETCH_INGREDIENTS_FAILED: return fetchIngredientsFailed(state, action);
        
        default: return state;
    }
    
}

export default reducer;