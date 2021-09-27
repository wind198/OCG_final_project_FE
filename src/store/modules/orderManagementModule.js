import { GET_ORDER_MANAGEMENT_DATA } from "../actions.type";
import { HIDE_ORDER_DETAILS,SET_SORT_FIELD, TOGGLE_SORT_DIRECTION, CLEAR_STATUS, SET_ORDER_MANAGEMENT_DATA_SUCCESS, SET_ORDER_MANAGEMENT_DATA_FAIL, SET_STATUS, SET_CURRENT_ORDER_ID, CLEAR_CURRENT_ORDER_ID } from "../mutations.type";
import ApiServices from "../../common/api.services";
const state = {
    //chart data



    orderManagementData: [],
    currentOrderID: 0,
    showOrderDetail: false,
    getOrderDataSuccess: null,
    resultMessage: "",
    sortDirection: 1,
    sortField: "",

}
const getters = {

    orderManagementDataToShow: (state) => {
        const sortField = state.sortField;
        const sortDirection = state.sortDirection;
        if (state.orderManagementData.length > 0) {
            let orderManagementData = state.orderManagementData;
            orderManagementData=orderManagementData.map((e)=>{
                if(e.FulfilledAt=="0001-01-01T00:00:00Z"){
                    e.FulfilledAt="No info";
                }
                return e;
            })

            if (Object.keys(orderManagementData[0]).indexOf(sortField) > -1) {
                console.log("sorting folliing ", sortField);
                const orderManagementDataToShow = [...orderManagementData];
                orderManagementDataToShow.sort((a, b) => {
                    let x = a[sortField];
                    let y = b[sortField];
                    console.log(x, y);
                    let comparison = 0;
                    if (sortField == 'ID' || sortField == 'TotalPrice') {
                        comparison = x > y ? -1 * sortDirection : 1 * sortDirection
                    } else if (sortField == 'CreatedAt' || sortField == 'UpdatedAt' || sortField == 'DeletedAt' || sortField == 'FulfilledAt') {
                        console.log(new Date(x).getTime(), new Date(y).getTime());
                        comparison = (new Date(x)).getTime() > (new Date(y)).getTime() ? -1 * sortDirection : 1 * sortDirection
                    } else if (sortField == 'ReportSend' || sortField == 'Status') {
                        comparison = x > y ? -1 * sortDirection : 1 * sortDirection
                    }
                    console.log(comparison);
                    return comparison;
                })
                return orderManagementDataToShow;
            }
            return  orderManagementData;
        }
    },

    orderManagementDataHeadings: (state) => {
        if (state.orderManagementData[0]) {
            let output = Object.keys(state.orderManagementData[0]).filter((i) => i.toLowerCase() !== 'orderdetails');
            output = output.filter((e) => e !== 'Email'
                && e !== 'Phone'
                && e !== 'CustomerName'
                && e !== 'Address'
            )
            return output;


        } else return [];
    }
    ,

    currentOrder: (state) => {
        let currentOrder = state.orderManagementData.filter((od) => od.ID == state.currentOrderID)[0];
        if (currentOrder) {
            return currentOrder;
        } else return undefined

    },
    currentOrderCustomerInfo: (state, getters) => {
        if (getters.currentOrder) {
            const { CustomerName, Phone, Address, Email } = getters.currentOrder;
            return { customerName: CustomerName, phone: Phone, address: Address, email: Email }
        } else return {}
    },
    currentOrderDetails: (state, getters) => {
        if (getters.currentOrder) {
            const { OrderDetails: orderDetails } = getters.currentOrder;
            const output = [];
            orderDetails.forEach((e) => {
                output.push({ productVarianceID: e.ProductVarianceID, quantity: e.Quantity })
            })
            return output;
        } else return {};
    }



};
const actions = {

    async[GET_ORDER_MANAGEMENT_DATA]({ commit }, payload) {
        try {
            commit(HIDE_ORDER_DETAILS);
            const orderManagementResponse = await ApiServices.query(`/orders/${payload.start}/${payload.end}/managements`);
            console.log(orderManagementResponse.data);
            // const ordersTable = orderManagementResponse.data.Orders;
            // const orderDetailsTable = orderManagementResponse.data.OrderDetail;
            // ordersTable.forEach((od) => {
            //     delete od.OrderDetails;
            //     od.OrderDetails = [];
            //     orderDetailsTable.forEach((odd) => {
            //         if (odd.OrderID == od.ID) {
            //             const { ProductVarianceID, Quantity, } = odd;
            //             od.OrderDetails.push({ ProductVarianceID, Quantity })
            //         }
            //     })
            // })
            commit(SET_STATUS, { statusCode: 200, statusText: "OK", data: ["Get data succeed"] })
            commit(SET_ORDER_MANAGEMENT_DATA_SUCCESS, orderManagementResponse.data)
        }
        catch (err) {
            commit(SET_STATUS, err.response)
            commit(SET_ORDER_MANAGEMENT_DATA_FAIL)
        }
    }
}
const mutations = {

    [SET_STATUS](state, data) {
        state.status = data;
    },

    [SET_ORDER_MANAGEMENT_DATA_SUCCESS](state, payload) {
        state.orderManagementData = payload
        state.getOrderDataSuccess = true;
        state.resultMessage = state.status.data
    },
    [SET_ORDER_MANAGEMENT_DATA_FAIL](state) {
        state.getOrderDataSuccess = false;
        state.resultMessage = state.status.data
    },

    [SET_CURRENT_ORDER_ID](state, id) {
        state.currentOrderID = id;
        state.showOrderDetail = true;
    },
    [CLEAR_CURRENT_ORDER_ID](state) {
        state.currentOrderID = 0;
        state.showOrderDetail = false;
    },
    [CLEAR_STATUS](state) {
        state.getOrderDataSuccess = null;
        state.resultMessage = "";
        state.status = {};
    },
    [SET_SORT_FIELD](state, value) {
        state.sortField = value;
    },
    [TOGGLE_SORT_DIRECTION](state) {
        state.sortDirection = -state.sortDirection;

    },
    [HIDE_ORDER_DETAILS](state){
        state.showOrderDetail=false;
    }

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};