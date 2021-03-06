import { SEND_ORDER, SET_ORDER_FULFILLED } from "../actions.type";
import {
    SET_CONFIRMED_ORDER, SET_PAYMENT_FAILED, ADD_ITEM, REMOVE_ITEM,
    SET_ERRORS, CLEAR_SEND_ORDER_RESULT, SET_FAILED_ORDER, SET_PAYMENT_SUCCESS
} from "../mutations.type"
import ApiServices from "../../common/api.services";
const state = {
    
    cartItems: [],
    total: null,

    //order
    orderID: "",
    sendOrderSucess: null,
    // orderFullfilled: false,
    sendOrderResultMessage: "",

    //payment
    paymentSucess: null,
    paymentResultMessage: "",

    errors: {},

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
    async [SEND_ORDER]({ commit }, order) {


        try {
            console.log("sending order", order);
            const response = await ApiServices.post('/orders', order);
            console.log("response received", response.data);
            commit(SET_CONFIRMED_ORDER, response.data.ID)
        }
        catch (err) {
            console.log(err.response);
            commit(SET_ERRORS, {...err.response,data:[err.response.data,]});
            commit(SET_FAILED_ORDER);
        }
    },
    async [SET_ORDER_FULFILLED]({ commit }, orderID) {
        try {
            console.log("before sucess",orderID);
            commit(SET_PAYMENT_SUCCESS);
            console.log("after sucess",orderID);
            const response = await ApiServices.query(`/orders/${orderID}/fulfill`);
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
            commit(SET_ERRORS, error.response);
        }
    }



}



const mutations = {

    [ADD_ITEM](state, item) {
        console.log("adding");
        let items = state.cartItems;
        let resolved = false;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].productVarianceID == item.productVarianceID) {
                    items[i].quantity += item.quantity;
                    console.log("break");
                    resolved = true;
                    break;
                }
            }
            if (!resolved) { items.push(item); }

        } else {
            items.push(item);
        }
        const addToTotal = item.price * item.quantity;
        state.total += addToTotal;
    }
    ,
    [REMOVE_ITEM](state, itemToRemoveID) {
        console.log("commit remove", itemToRemoveID);
        console.log(state.cartItems);
        state.cartItems = state.cartItems.filter((i) => {
            console.log(i.productVarianceID, itemToRemoveID, i.productVarianceID == itemToRemoveID);
            if (i.productVarianceID == itemToRemoveID) {
                console.log("found!");
                state.total -= i.price * i.quantity;
                return false;
            } else { return true; }
        })
    },


    // [SET_ITEM](state, payload) {
    //     state.cartItems = state.cartItems.map((i) => {
    //         if (i.productVarianceID == payload.productVarianceID) {
    //             return { ...i, ...payload }
    //         } else {
    //             return i;
    //         }
    //     })

    // },
    [SET_CONFIRMED_ORDER](state, orderID) {
        console.log("setting orderID", orderID);
        state.orderID = orderID;
        state.cartItems = [];
        state.total = 0;
        state.sendOrderResultMessage = [`Thanks you. Your order is confirmed with OrderID ${orderID} . You can now proceed to payment`,];
        state.sendOrderSucess = null;
        state.sendOrderSucess = true;
    },
    [SET_FAILED_ORDER](state) {
        state.sendOrderResultMessage = state.errors.data;
        state.sendOrderSucess = null;
        state.sendOrderSucess = false;
    },

    [CLEAR_SEND_ORDER_RESULT](state) {
        state.sendOrderResultMessage = "";
        state.sendOrderSucess = null;
    },
    // [FULLFILL_ORDER](state) {
    //     state.orderFullfilled = true;
    // },
    [SET_PAYMENT_SUCCESS](state) {
        state.orderID = "";
        state.paymentSucess = null;
        state.paymentSucess = true;
        state.paymentResultMessage = ["Payment succeeded",];
    },
    [SET_PAYMENT_FAILED](state) {
        state.paymentResultMessage = state.errors.data;
        state.paymentSucess = null;
        state.paymentSucess = false;
    },


    [SET_ERRORS](state, errors) {
        state.errors = errors;
    },

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};