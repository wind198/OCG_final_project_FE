import { GET_REPORT_DATA } from "../actions.type";
import { SET_ERRORS,RESET_DATA, SET_GET_REPORT_FAIL,SET_GET_REPORT_SUCCESS} from "../mutations.type"
import ApiServices from "../../common/api.services";
const state = {
    saleData: {},
    bestSells: [],
    getReportSuccess: null,
    resultMessage: "",
    errors: {}
}
const getters = {};
const actions = {
    async [GET_REPORT_DATA]({ commit }, payload) {


        try {
            console.log("GETTING REPORT DATA",);
            const saleResponse = await ApiServices.query(`/orders/${payload.start}/${payload.end}/analysis`);
            console.log("report received", saleResponse.data);
            const bestSellsResponse = await ApiServices.query(`/products/${payload.start}/${payload.end}/bestsellings`);
            console.log("bestsell received", bestSellsResponse.data);
            commit(SET_GET_REPORT_SUCCESS, { saleData:saleResponse.data, bestSellsData:bestSellsResponse.data });
            return  { saleData:saleResponse.data, bestSellsData:bestSellsResponse.data }
        }
        catch (err) {
            commit(SET_ERRORS, err.response);
            commit(SET_GET_REPORT_FAIL);
        }
    },
}
const mutations = {

    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },
    [SET_GET_REPORT_SUCCESS](state, payload) {
        state.saleData = payload.saleData;
        state.bestSells = payload.bestSellsData;
        state.getReportSuccess = true;
        state.resultMessage = [];
        state.resultMessage.push("Get report data success");
        if (state.saleData.total_orders === 0) {
            state.resultMessage = [...state.resultMessage, "You have no orders."]
        }
        if (state.bestSells === null) {
            state.resultMessage = [...state.resultMessage, "You have no sales."]
        }
    },
    [SET_GET_REPORT_FAIL](state) {
        console.log("setting fail");
        state.getReportSuccess = false;
        console.log("after fail,",state.getReportSuccess);
        state.resultMessage = state.errors.data;
    },
    [RESET_DATA](state) {
        console.log("reseting");
        state.saleData = {};
        state.bestSells = [];
        state.getReportSuccess = null;
        console.log("after reset,",state.getReportSuccess);
        state.resultMessage = "";
        state.errors = {};
    }
}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};