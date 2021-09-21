import { createStore } from 'vuex'
import product from "./modules/product.module"
import home from "./modules/home.module"
import collection from "./modules/collection.module"
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    product,home,collection
  },
  plugins: [createPersistedState()],
})
