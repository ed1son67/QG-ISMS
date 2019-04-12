// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sleepStatus: [
      {
        label: '状态标签:',
        value: '晚睡 乖宝宝'
      }, {
        label: '睡眠平均分:',
        value: '78分'
      }, {
        label: '心脏总能量:',
        value: '4800'
      }, {
        label: '平均时长:',
        value: '12'
      }
    ],
    formData: [
      {
        label: '姓名:',
        value: '锋哥'
      }, {
        label: '性别:',
        value: '男'
      }, {
        label: '身高:',
        value: '1.80m'
      }, {
        label: '体重',
        value:''
      }, {
        label: '生日:',
        value: ''
      }
    ],
    deviceStatus: [
      {
        label: 'WIFI连接状态:',
        value: 'GDUT'
      }, {
        label: '蓝牙连接状态:',
        value: '未连接'
      }
    ]
   
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