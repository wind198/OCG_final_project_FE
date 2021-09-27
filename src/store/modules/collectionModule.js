import { FETCH_SINGLE_CATEGORY, FETCH_SINGLE_COLLECTION, FETCH_ALL_COLLECTION_PRODUCTS } from "../actions.type";
import { SET_PRODUCTS_TO_SHOW, SET_CURRENT_PAGE, CLEAR_PRODUCTS, SET_STATUS, SET_COLLECTION_CATEGORIES, SET_MAXIMUM_PRODUCT_NUMBER } from "../mutations.type"
import ApiServices from "../../common/api.services"
import { productPerPage } from "../../common/contanst";
const state = {
    ID: 0,
    CollectionName: "",
    Categories: [],
    productsToShow: [],
    currentPage: 1,
    status: {},
    maxProductNumber: 0,
    empty: null,
}

const getters = {
    status: (state) => {
        if (!state.status) {
            return []
        }
        return Object.keys(state.status).map((key) => {
            return `${key}${state.status[key]}`;
        });
    },
   
    numberOfPage: (state) => {
        return Math.ceil(state.maxProductNumber / productPerPage)
    }
};

const actions = {
    async [FETCH_SINGLE_COLLECTION]({ commit, state }, collectionID) {
        state.empty = false;
        try {
            const response = await ApiServices.query(`/collections/${collectionID}/categories`);
            commit(SET_COLLECTION_CATEGORIES, response.data);
        }
        catch (err) {
            console.log(err);
            commit(SET_STATUS, err.response.data.errors);
        }
    },
    async [FETCH_ALL_COLLECTION_PRODUCTS]({ commit, state }, payload) {
        state.empty = false;
        try {
            console.log("fetching all products for collection", payload);
            const response = await ApiServices.query(`/collections/${payload.id}/products?limit=${productPerPage}&offset=${payload.offset}`);
            console.log("allproducts", response);

            let maxProductNumber = 0;
            state.Categories.forEach((c) => {
                maxProductNumber += parseFloat(c.ProductNumber);
            })
            commit(SET_PRODUCTS_TO_SHOW, response.data);
            if (state.productsToShow.length == 0) {
                state.empty = true;
            }
            commit(SET_MAXIMUM_PRODUCT_NUMBER, maxProductNumber);
        }
        catch (err) {
            console.log(err);
            commit(SET_STATUS, err.response.data.errors);
        }
    },


    async  [FETCH_SINGLE_CATEGORY]({ commit, state }, payload) {
        state.empty = false;
        try {
            console.log("fetching all products for category", payload);
            const response = await ApiServices.query(`/categories/${payload.id}/products?limit=${productPerPage}&offset=${payload.offset} `)
            commit(SET_PRODUCTS_TO_SHOW, response.data[1]);
            if (state.productsToShow.length == 0) {
                state.empty = true;
            }
            const maxProductNumber = state.Categories.filter((c) => c.ID == payload.id)[0].ProductNumber;
            commit(SET_MAXIMUM_PRODUCT_NUMBER, maxProductNumber);

        }
        catch (err) {
            console.log(err);
            commit(SET_STATUS, err.response.data.errors);
        }
    }
}

const mutations = {

    [SET_COLLECTION_CATEGORIES](state, categories) {
        state.Categories = categories;
    }
    ,

    [SET_PRODUCTS_TO_SHOW](state, payload) {
        state.productsToShow = payload;

    },
    [CLEAR_PRODUCTS](state) {
        state.Categories.forEach(category => {
            category.Products = [];
        });
    }
    ,
    [SET_STATUS](state, data) {
        state.status = data;
    }
    ,
    [SET_CURRENT_PAGE](state, value) {
        state.currentPage = value
    },
    [SET_MAXIMUM_PRODUCT_NUMBER](state, value) {
        state.maxProductNumber = value
    },
}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};