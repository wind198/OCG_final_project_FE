import { createStore } from 'vuex'
import productModule from "./modules/productModule"
import homeModule from "./modules/homeModule"
import collectionModule from "./modules/collectionModule"
import cartModule from "./modules/cartModule"
// import createPersistedState from "vuex-persistedstate";

export default createStore({

  modules: {
    productModule, homeModule, collectionModule,cartModule
  },
  // plugins: [createPersistedState()],
})
