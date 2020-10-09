import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth';
import createPersistedState from 'vuex-persistedstate';


Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    auth
  }
})
