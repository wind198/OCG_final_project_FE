import { createStore } from 'vuex'
import productModule from "./modules/productModule"
import homeModule from "./modules/homeModule"
import collectionModule from "./modules/collectionModule"
// import createPersistedState from "vuex-persistedstate";

export default createStore({

  modules: {
    productModule, homeModule, collectionModule
  },
  // plugins: [createPersistedState()],
})
