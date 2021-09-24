import { createStore } from 'vuex'
import productModule from "./modules/productModule"
import homeModule from "./modules/homeModule"
import collectionModule from "./modules/collectionModule"
import cartModule from "./modules/cartModule"
import analysisModule from "./modules/analysisModule"
// import createPersistedState from "vuex-persistedstate";

export default createStore({

  modules: {
    productModule, homeModule, collectionModule,cartModule
    ,analysisModule,
  },
  // plugins: [createPersistedState()],
})
