import * as types from './mutation-types'

export default {
    [types.SET_LOGIN_USER_INFO](state,data){
        if(data.isCache){
            state.userLoginInfo = data.value;
            wx.setStorageSync('userLoginInfo',JSON.stringify(data.value));
        }else{
            state.userLoginInfo = data.value;
        }        
    }
}
