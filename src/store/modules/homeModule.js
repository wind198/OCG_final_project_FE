import { FETCH_ALL_PAGE, FETCH_SINGLE_PAGE } from "../actions.type";
import { checkIfExistInObjectArray } from "../../common/helper";
import {
    SHOW_LOADING, HIDE_LOADING, SET_PAGE, SET_MAIN_PAGE, TOGGLE_ANIMATION,
    SHOW_SEARCH_BAR,
    HIDE_SEARCH_BAR,
    SET_SEARCH_KEYWORD,
    SET_SEARCH_RESULT,
    CLEAR_SEARCH_RESULT,
    SET_STATUS,

} from "../mutations.type"
import ApiServices from "../../common/api.services"
const defaultSearchResult = {
    //sap xep theo thu tu releavance giam dan
    products: [],
    collections: []
};

const state = {
    pages: [],
    mainPageID: "",
    collections: [],
    status: {},
    showAnimation: false,
    loading: false,
    showSearchBar: false,
    searchKeyWord: "",
    showSearchResult: false,
    searchResult: defaultSearchResult,
};

const getters = {
    status: (state) => {
        if (!state.status) {
            return []
        }
        return Object.keys(state.status).map((key) => {
            return `${key}${state.status[key]}`;
        });
    },

    mainPage: (state) => {
        const pages = state.pages;
        const mainPageIndex =  state .mainPageID;
        const mainPage = pages.filter((e) => e.ID == mainPageIndex)[0];
        return mainPage?mainPage:{};
    },
    collectionList:(state,getters)=>{
        return getters.mainPage.Collections;
    },
    mainPageName:(state,getters)=>{
        return getters.mainPage.PageName;
    }


};

const actions = {
    async [FETCH_ALL_PAGE]({ commit }) {
        try {
            const data = await ApiServices.query(`/pages/collections`)
            commit(SET_PAGE, data.data);
        }
        catch (err) {
            console.log(err);
            commit(SET_STATUS, err.response.data.errors);
        }
    },
    [FETCH_SINGLE_PAGE]({ commit }, payload) {
        console.log(payload.id, 'ID', state.pages);
        console.log(checkIfExistInObjectArray(payload.id, 'ID', state.pages));
        if (checkIfExistInObjectArray(payload.id, 'ID', state.pages)) {
            commit(SET_MAIN_PAGE, payload.id);
            commit(SET_STATUS,{statusCode:200, statusText:"OK", data: "Fetch main page succeed"})
        } else {
            console.log("error");
            commit(SET_STATUS, { statusCode: 404, statusText: "NOT FOUND", data: "This page does not exist" });

        }
    }
}

const mutations = {
    [SET_PAGE](state, pages) {
        state.pages = pages;
    },
    [SET_MAIN_PAGE](state, mainPageID) {
        state.mainPageID = mainPageID;
    },
    [SET_STATUS](state, data) {
        state.status = data;
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