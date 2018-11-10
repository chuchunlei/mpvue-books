import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const user = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

export default user