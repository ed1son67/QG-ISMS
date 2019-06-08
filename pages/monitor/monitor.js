// pages/monitor/monitor.js
import * as echarts from '../../ec-canvas/echarts';



Page({
  data: {
    heartRateData: 0,
    breathRateData: 0,
    noiseData: 0,
    sleepStatus: '离枕',
    timer: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
    this.getData();
    this.setData({
      timer: setInterval(this.getData, 5000)
    })
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  
  getData: function() {
   
    wx.request({
      
      url: 'https://www.ed1son.cn:11118/report/sleep?date=2019-06-08&id=1',
      // url: 'https://www.ed1son.cn',

      method: 'get',
      success: (res) => {
        
        console.log(res.data.data.rateList[0]);
        if (res.data.data.rateList[0].sleepStatus === 0) {
          this.setData({
            heartRateData: 0,
            breathRateData: 0,
            noiseData: 0,
            sleepStatus: '离枕'
          })
        } else {
          let data = res.data.data.rateList[0];
          this.setData({
            heartRateData: data.heartAvg,
            breathRateData: data.breathAvg,
            noiseData: data.envAvg,
            sleepStatus: '在枕'
          })
        }
      }
    })
   
  },  
}
)

function getCurrentDate() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentDate = date.getFullYear() + '-' + month + '-' + strDate + '-';
  return currentDate;
}
