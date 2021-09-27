import { GET_REPORT_DATA, } from "../actions.type";
import { SET_MAX_BAR_NUMBER, SET_STATUS, RESET_DATA, SET_GET_REPORT_FAIL, SET_GET_REPORT_SUCCESS, } from "../mutations.type"
import ApiServices from "../../common/api.services";
import {
    calculateXdistanceBetweenBar,
    randomColorCodeGenerator,
} from "../../common/helper";
const state = {
    //chart data
    fieldWidth: 750,
    fieldHeight: 320,
    barWidth: 20,
    padding: 60,
    maxBarShownOnChart: 10,
    //start & end time

    //data from api
    orderData: {},
    bestSells: [],
    getReportSuccess: null,
    resultMessage: "",
    status: {},




}
const getters = {
    bestSellsWithColor: (state) => {
        const bestSells = state.bestSells;
        const maxBarShownOnChart = state.maxBarShownOnChart;

        if (bestSells.length > 0) {
            const bestSellsWithRandomColor = [];
            bestSells.slice(0, maxBarShownOnChart).forEach((e) => {
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
        const maxBarShownOnChart = state.maxBarShownOnChart;
        if (bestSells.length > 0) {
            const numberOfBar = bestSells.slice(
                0,
                maxBarShownOnChart
            ).length;
            return calculateXdistanceBetweenBar(fieldWidth, padding, numberOfBar);
        } else {
            return null;
        }
    },






};
const actions = {
    async [GET_REPORT_DATA]({ commit }, payload) {


        try {
            const orderDataResponse = await ApiServices.query(`/orders/${payload.start}/${payload.end}/analysis`);
            const bestSellsResponse = await ApiServices.query(`/products/${payload.start}/${payload.end}/bestsellings`);
            commit(SET_GET_REPORT_SUCCESS, { orderData: orderDataResponse.data, bestSells: bestSellsResponse.data });
        }
        catch (err) {
            commit(SET_STATUS, err.response);
            commit(SET_GET_REPORT_FAIL);
        }
    },

}
const mutations = {

    [SET_STATUS](state, data) {
        state.status = data;
    },
    [SET_MAX_BAR_NUMBER](state, num) {
        state.maxBarShownOnChart = num;
    },


    [SET_GET_REPORT_SUCCESS](state, payload) {
        state.orderData = payload.orderData;
        state.bestSells = payload.bestSells;
        state.getReportSuccess = true;
        state.resultMessage = [];
        state.resultMessage.push("Get report data success");
        if (state.orderData.total_orders === 0) {
            state.resultMessage = [...state.resultMessage, "You have no orders."]
        }
        if (state.bestSells === null) {
            state.bestSells = []
            state.resultMessage = [...state.resultMessage, "You have no sales."]
        }
    },
    [SET_GET_REPORT_FAIL](state) {
        state.getReportSuccess = false;
        state.resultMessage = state.status.data;
    },
    [RESET_DATA](state) {
        state.orderData = {};
        state.bestSells = [];
        state.getReportSuccess = null;
        state.resultMessage = "";
        state.status = {};
    },


}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};