import * as types from './mutation-types'

export default {
    [types.TEST](state,data){
        state.test.code = data
    },
    [types.ACTION_TEST](state,data){
        state.test.info = data || 'test oj8k';
    }
}