// pages/suggestion/suggestion.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    maskTitle: '',
    nowPath: '',
    showMask: true,
    cardData: [
      {
        src: '../../static/images/card.png'
      }
    ]
  },
  showDetail: function(e)  {
    let url = ['../../static/images/card_1_detail.png', '../../static/images/card_2_detail.png', '../../static/images/card_3_detail.png', '../../static/images/card_4_detail.png', '../../static/images/card_5_detail.png', '../../static/images/card_6_detail.png'];

    let title = ['放松身体', '改善睡眠环境', '呼噜呼噜',  '让手机也放松一会儿', '深度睡眠', '早睡早起']
    this.setData({
      showMask: false,
      nowPath: url[e.currentTarget.dataset.index],
      maskTitle: title[e.currentTarget.dataset.index]
    })
    
   
  },
  /**
   * 关闭弹窗
   */
  closeMask: function() {
    this.setData({
      showMask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  }
})