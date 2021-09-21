import { FETCH_SINGLE_PRODUCT } from "../actions.type";
import { SET_ERRORS, SET_PRODUCT_PROPS, SET_QUANTITY_SELECTED } from "../mutations.type"
import apiServices from "../../common/api.services"
const state = {
    product: null,
    errors: null,
    quantitySelected: 0
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
    [SET_PRODUCT_PROPS](state, product) {
        state.product = product;
    },
    [SET_QUANTITY_SELECTED](state, quantitySelected) {
        state.quantitySelected = quantitySelected;
    },
    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};