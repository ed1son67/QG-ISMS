// pages/center/center.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sleepStatus: [
      {
        label: '状态标签:',
        value: '晚睡 失眠 打鼻鼾'
      }, {
        label: '睡眠平均分:',
        value: '78分'
      }, {
        label: '心脏总能量:',
        value: '4800'
      }, {
        label: '平均时长:',
        value: '7h5min'
      }
    ],
    formData: [
      {
        label: '姓名:',
        value: ''
      }, {
        label: '性别:',
        value: ''
      }, {
        label: '身高:',
        value: ''
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
        value: '未连接'
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
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ed1son.cn:11118/usercenter/queryinfo?id=1',
      success: (res) => {
        console.log(res.data.data.user)
        let data = res.data.data.user;
        this.setData({
          'formData[0].value': data.name,
          'formData[1].value': data.sex,
          'formData[2].value': data.height+'m',
          'formData[3].value': data.weight+'KG',
          'formData[4].value': data.birthday,
          'sleepStatus[0].value': data.tag,
          'sleepStatus[1].value': data.sleepScoreAvg,
          'sleepStatus[2].value': data.power,
          'sleepStatus[3].value': data.sleepTimeAvg + 'min' 
        })
        wx.hideLoading();
      }
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