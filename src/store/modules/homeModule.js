import { FETCH_ALL_PAGE, FETCH_SINGLE_PAGE } from "../actions.type";
import { SET_PAGE,SET_MAIN_PAGE, SET_ERRORS,TOGGLE_ANIMATION } from "../mutations.type"
import ApiServices from "../../common/api.services"
const state = {
    pages: null,
    mainPageID: "",
    collections: null,
    errors: null,
    showAnimation:false

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
    [TOGGLE_ANIMATION](state){
        state.showAnimation=!state.showAnimation;
    }

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};