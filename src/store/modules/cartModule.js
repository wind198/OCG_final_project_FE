import { SEND_ORDER } from "../actions.type";
import { ADD_ITEM, REMOVE_ITEM, CLEAR_CART, SET_ITEM } from "../mutations.type"
const state = {
    // variance_id: pickedVariance.value.ID,
    // name: name.value,
    // image: image.value,
    // price: pickedVariance.value.price,
    // quantity: quantity.value,
    cartItems: [],
    total: null,
    errors: {}
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
    async [SEND_ORDER]() {
        console.log("sending order");
    }
}

const mutations = {

    [ADD_ITEM](state, item) {
        console.log("adding");
        let items = state.cartItems;
        let resolved = false;
        if (items.length > 0) {
            for (let i = 0; i < items.length; i++) {
                if (items[i].variance_id == item.variance_id) {
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
            console.log(i.variance_id, itemToRemoveID, i.variance_id == itemToRemoveID);
            if (i.variance_id == itemToRemoveID) {
                console.log("found!");
                state.total -= i.price * i.quantity;
                return false;
            } else { return true; }
        })
    },
    [CLEAR_CART](state) {
        state.cartItems = [];
    }
    ,
    [SET_ITEM](state, payload) {
        state.cartItems = state.cartItems.map((i) => {
            if (i.varianceID == payload.varianceID) {
                return { ...i, ...payload }
            } else {
                return i;
            }
        })

    }

}
export default {
    state, getters, actions, mutations,
    namespaced: true,
};