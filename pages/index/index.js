//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
  },
  //事件处理函数
  switchPage: function(e) {
    let url = ['../report/report', '../suggestion/suggestion', '../center/center', '../monitor/monitor'];
   
    wx.navigateTo({
      url: url[e.currentTarget.dataset.index]
    })
  },
  onLoad: function () {
    
  },

})
