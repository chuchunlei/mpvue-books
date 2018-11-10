
function showLoading(title){
    wx.showLoading({
        mask:true,
        complete:()=>{
            setTimeout(()=>{
                wx.hideLoading();
            },500)
        }
    })
}

function hideLoading(title){
    wx.hideLoading();
}

function showToast(title,type){
    wx.showToast({
        title,
        icon:type,
        mask:true
    })
}

function showModal(title,content){
    wx.showModal({
        title,
        content,
        showCancel:false
    })
}


export default{
    showLoading,
    hideLoading,
    showToast,
    showModal
}