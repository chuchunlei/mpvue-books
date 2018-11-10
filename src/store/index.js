import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'
import user from './user'
import test from './test'

Vue.use(Vuex);

export default new Vuex.Store({
    state:{},
    mutations:{},
    actions:{},
    modules:{
        user,
        test
    },
    // plugins: [createPersistedState({
    //     storage:{
    //         getItem: key => wx.getStorageSync(key),
    //         setItem: (key, value) => wx.setStorageSync(key, value),
    //         removeItem: key => wx.clearStorage()
    //     }
    // })]
})