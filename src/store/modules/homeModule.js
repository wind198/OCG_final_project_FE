import { FETCH_ALL_PAGE, FETCH_SINGLE_PAGE } from "../actions.type";
import {
    SHOW_LOADING, HIDE_LOADING, SET_PAGE, SET_MAIN_PAGE, SET_ERRORS, TOGGLE_ANIMATION,
    SHOW_SEARCH_BAR,
    HIDE_SEARCH_BAR,
    SET_SEARCH_KEYWORD,
    SET_SEARCH_RESULT,
    CLEAR_SEARCH_RESULT,

} from "../mutations.type"
import ApiServices from "../../common/api.services"
const defaultSearchResult = {
    //sap xep theo thu tu releavance giam dan
    products: [],
    collections: []
};
const state = {
    pages: null,
    mainPageID: "",
    collections: null,
    errors: null,
    showAnimation: false,
    loading: false,
    showSearchBar: false,
    searchKeyWord: "",
    showSearchResult: false,
    searchResult: defaultSearchResult,


};

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
    async [FETCH_ALL_PAGE]({ commit }) {
        try {
            const data = await ApiServices.query(`/pages/collections`)
            commit(SET_PAGE, data.data);
        }
        catch (err) {
            console.log(err);
            commit(SET_ERRORS, err.response.data.errors);
        }
    },
    [FETCH_SINGLE_PAGE]({ commit }, payload) {
        commit(SET_MAIN_PAGE, payload.id);
    }
}

const mutations = {
    [SET_PAGE](state, pages) {
        state.pages = pages;
    },
    [SET_MAIN_PAGE](state, mainPageID) {
        state.mainPageID = mainPageID;
    },
    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },
    [TOGGLE_ANIMATION](state) {
        state.showAnimation = !state.showAnimation;
    },
    [SHOW_LOADING](state) {
        state.loading = true;
    },
    [HIDE_LOADING](state) {
        state.loading = false;
    }
    ,
    [SHOW_SEARCH_BAR](state) {
        state.showSearchBar = true
    },
    [HIDE_SEARCH_BAR](state) {
        state.hideSearchBar = true
    },
    [SET_SEARCH_KEYWORD](state, value) {
        state.searchKeyWord = value
    }
    ,
    [SET_SEARCH_RESULT](state, result) {
        state.searchReult = result
        state.showSearchResult = true
    },
    [CLEAR_SEARCH_RESULT](state) {
        state.searchResult = defaultSearchResult;
    }
}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};