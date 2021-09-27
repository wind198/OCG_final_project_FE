import { createStore } from 'vuex'
import productModule from "./modules/productModule"
import homeModule from "./modules/homeModule"
import collectionModule from "./modules/collectionModule"
import cartModule from "./modules/cartModule"
import analysisModule from "./modules/analysisModule"
import orderManagementModule from "./modules/orderManagementModule"
// import createPersistedState from "vuex-persistedstate";

export default createStore({

  modules: {
    productModule, homeModule, collectionModule,cartModule
    ,analysisModule,orderManagementModule
  },
  // plugins: [createPersistedState()],
})
