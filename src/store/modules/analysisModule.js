import { GET_REPORT_DATA } from "../actions.type";
import { SET_MAX_BAR_NUMBER,SET_ERRORS, RESET_DATA, SET_GET_REPORT_FAIL, SET_GET_REPORT_SUCCESS } from "../mutations.type"
import ApiServices from "../../common/api.services";
import {
    calculateXdistanceBetweenBar,
    randomColorCodeGenerator,
} from "../../common/helper";
const state = {
    fieldWidth: 750,
    fieldHeight: 320,
    barWidth: 20,
    padding: 60,
    maxBarShownOnnChart: 20,
    saleData: {},
    bestSells: [],
    getReportSuccess: null,
    resultMessage: "",
    errors: {}
}
const getters = {
    bestSellsWithColor: (state) => {
        const bestSells = state.bestSells;
        const maxBarShownOnnChart = state.maxBarShownOnnChart;
      
        if (bestSells.length>0) {
            const bestSellsWithRandomColor = [];
            bestSells.slice(0, maxBarShownOnnChart).forEach((e) => {
                bestSellsWithRandomColor.push({
                    ...e,
                    color: randomColorCodeGenerator(200, 20),
                });
            });
            return bestSellsWithRandomColor;
        } else return [];
    },
    distanceBetweenBar: (state) => {
        const bestSells = state.bestSells;
        const fieldWidth = state.fieldWidth;
        const padding = state.padding;
        const maxBarShownOnnChart = state.maxBarShownOnnChart;
        if (bestSells.length>0) {
            const numberOfBar = bestSells.slice(
                0,
                maxBarShownOnnChart
            ).length;
            return calculateXdistanceBetweenBar(fieldWidth, padding, numberOfBar);
        } else {
            return null;
        }
    }



};
const actions = {
    async [GET_REPORT_DATA]({ commit }, payload) {


        try {
            const saleResponse = await ApiServices.query(`/orders/${payload.start}/${payload.end}/analysis`);
            const bestSellsResponse = await ApiServices.query(`/products/${payload.start}/${payload.end}/bestsellings`);
            commit(SET_GET_REPORT_SUCCESS, { saleData: saleResponse.data, bestSellsData: bestSellsResponse.data });
            return { saleData: saleResponse.data, bestSellsData: bestSellsResponse.data }
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
    [SET_MAX_BAR_NUMBER](state, num) {
        state.maxBarShownOnnChart = num;
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
            state.bestSells = []
            state.resultMessage = [...state.resultMessage, "You have no sales."]
        }
    },
    [SET_GET_REPORT_FAIL](state) {
        state.getReportSuccess = false;
        state.resultMessage = state.errors.data;
    },
    [RESET_DATA](state) {
        state.saleData = {};
        state.bestSells = [];
        state.getReportSuccess = null;
        state.resultMessage = "";
        state.errors = {};
    }
}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};