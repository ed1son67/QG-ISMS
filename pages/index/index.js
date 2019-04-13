//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  switchPage: function(e) {
    let url = ['../report/report', '../suggestion/suggestion', '../center/center'];
   
    wx.navigateTo({
      url: url[e.currentTarget.dataset.index]
    })
  },
  onLoad: function () {
    // wx.login({
    //   success: () => {
    //     console.log(123)
    //   }
    // })
    wx.getUserInfo({
      success: (res) => {
        console.log(res.userInfo)
      }
    })  
  },

})
