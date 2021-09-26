import { FETCH_SINGLE_PRODUCT } from "../actions.type";
import {SET_QUANTITY, CLEAR_WARNING_STATE, SET_ERRORS, SET_PRODUCT_PROPS, SET_ADD_TO_CART_FAIL, SET_ADD_TO_CART_SUCCESS } from "../mutations.type"
import apiServices from "../../common/api.services"
const state = {
    ID: null,
    name: "",
    description: "",
    image: "",
    ProductVariances: [],
    categoryName: "",
    errors: null,
    quantitySelected: 1,
    warning: "",
    showWarning: null,
    addToCartSuccess: null

}

const getters = {
    errors: (state) => {
        if (!state.errors) {
            return []
        }
        return Object.keys(state.errors).map((key) => {
            return `${key}${state.errors[key]}`;
        });
    },
};

const actions = {
    async [FETCH_SINGLE_PRODUCT]({ commit }, payload) {
        try {
            const data = await apiServices.query(`/products/${payload.id}`)
            commit(SET_PRODUCT_PROPS, data.data);
        }
        catch (err) {
            console.log(err);
            commit(SET_ERRORS, err.response.data.errors);
        }
    },
}

const mutations = {
    [CLEAR_WARNING_STATE](state) {
        state.warning = "";
        state.showWarning = false;
    },
    [SET_PRODUCT_PROPS](state, product) {

        for (const key in product) {
            if (Object.hasOwnProperty.call(state, key)) {
                state[key] = product[key];
            }
        }
        state.image = product.Images[0].image;
        state.categoryName = product.Categories[0].category_name;

    },

    [SET_QUANTITY](state, quantity) {
        state.quantitySelected = quantity
    },
    [SET_ADD_TO_CART_SUCCESS](state ) {
        
        state.warning = ["product added successfully",];
        state.addToCartSuccess = null;
        state.addToCartSuccess = true;
        state.showWarning = true;
    },
    [SET_ADD_TO_CART_FAIL](state) {
        state.warning = state.errors.data;
        state.addToCartSuccess = null;
        state.addToCartSuccess = false;
        state.showWarning = true;
    },
    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};