import { FETCH_SINGLE_CATEGORY, FETCH_SINGLE_COLLECTION } from "../actions.type";
import {  SET_ERRORS,SET_COLLECTION_CATEGORIES,SET_CATEGORY_PRODUCTS } from "../mutations.type"
import ApiServices from "../../common/api.services"
import { productPerPage } from "../../common/contanst";
const state = {
    collection: "hello",
    errors: null
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
    async [FETCH_SINGLE_COLLECTION]({ commit }, payload) {
        try {
            const data = await ApiServices.query(`/collections/${payload.id}/categories`);
            commit(SET_COLLECTION_CATEGORIES, data.data);
        }
        catch (err) {
            console.log(err);
            commit(SET_ERRORS, err.response.data.errors);
        }
    },
    async  [FETCH_SINGLE_CATEGORY]({ commit }, payload) {
        try {
            const data = await ApiServices.query(`/products/${productPerPage}/categories/${payload.id}`)
            commit(SET_CATEGORY_PRODUCTS, { categoryID: payload.id, products: data.data });
        }
        catch (err) {
            console.log(err);
            commit(SET_ERRORS, err.response.data.errors);
        }
    }
}

const mutations = {

    [SET_COLLECTION_CATEGORIES](state, collection) {
        console.log("collection",collection);
       state.collection="abasdf";
       console.log(state.collection);
    }
    ,
    [SET_CATEGORY_PRODUCTS](state, payload) {
        state.collection.Categories = state.collection.Categories.map((category) => {
            if (category.ID == payload.categoryID) {
                return { ...category, Products: payload.products }

            } else return category
        }
        )
    },

    [SET_ERRORS](state, errors) {
        state.errors = errors;
    }

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};