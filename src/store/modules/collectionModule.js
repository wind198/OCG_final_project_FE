import { FETCH_SINGLE_CATEGORY, FETCH_SINGLE_COLLECTION } from "../actions.type";
import {CLEAR_PRODUCTS, SET_ERRORS, SET_COLLECTION_CATEGORIES, SET_CATEGORY_PRODUCTS } from "../mutations.type"
import ApiServices from "../../common/api.services"
import { productPerPage } from "../../common/contanst";
const state = {
    ID: 2,
    CreatedAt: "",
    UpdatedAt: "",
    DeletedAt: "",
    image: "//cdn.shopify.com/s/files/1/1089/1214/collections/hurricane_large.jpg?v=1592876146",
    collection_name: "",
    page_id: null,
    Categories: [],
    errors: {}
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
            console.log("fetching cllection");
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
            const data = await ApiServices.query(`/products/${productPerPage}/0/categories/${payload.id}`)
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
        for (const key in collection) {
            if (Object.hasOwnProperty.call(state, key)) {
                state[key] = collection[key];
            }
        }
    }
    ,
    [SET_CATEGORY_PRODUCTS](state, payload) {
        state.Categories = state.Categories.map((category) => {
            if (category.ID == payload.categoryID) {
                return { ...category, Products: payload.products }

            } else return category
        }
        )
    },
    [CLEAR_PRODUCTS](state) {
        state.Categories.forEach(category => {
            category.Products = [];
        });
    }
    ,
    [SET_ERRORS](state, errors) {
        state.errors = errors;
    }

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};