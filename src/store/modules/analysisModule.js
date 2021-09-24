import { } from "../actions.type";
import { } from "../mutations.type"
import ApiServices from "../../common/api.services";
const state = {
    errors:{}

}
 const getters = {};
const actions = {
    async [GET_REPORT_DATA]({ commit }, payload) {
        

        try {
            console.log("GETTING REPORT DATA", );
            const response = await ApiServices.query(`/orders/${payload.start}/${payload.end}/analysis`, );
            console.log("response received", response.data);
        }
        catch (err) {
            commit(SET_ERRORS, err.response);
        }
    },



}



const mutations = {
 
    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};