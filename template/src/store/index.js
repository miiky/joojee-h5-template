import Vue from 'vue'
import Vuex from 'vuex'

import global from './modules/global'
import app from './modules/app'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    global,
    app
  }
})
