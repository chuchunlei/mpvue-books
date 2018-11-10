
export default {
    getLoginUserInfo(state){
        if(!state.userLoginInfo){
            if(wx.getStorageSync('userLoginInfo')){
                return JSON.parse(wx.getStorageSync('userLoginInfo'))
            }
        }
        return state.userLoginInfo
    }
}