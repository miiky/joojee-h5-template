import Vue from 'vue'
import Vuex from 'vuex'

import ownSpace from './modules/ownSpace'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ownSpace
  }
})
