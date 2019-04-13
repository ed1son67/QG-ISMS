import * as echarts from '../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heartRateChart: {
      onInit: function (canvas, width, height) {
        const heartRateChart = echarts.init(canvas, null, {
          
          width: width,
          height: height,
          
        });
        canvas.setChart(heartRateChart);
        heartRateChart.setOption(getHeartRateOption());

        return heartRateChart;
      }
    },
    breathRateChart: {
      onInit: function (canvas, width, height) {
        const breathRateChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(breathRateChart);
        breathRateChart.setOption(getBreathRateOption());

        return breathRateChart;
      }
    },
    noiseChart: {
      onInit: function (canvas, width, height) {
        const noiseChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(noiseChart);
        noiseChart.setOption(getNoiseOption());

        return noiseChart;
      }
    },
    movingChart: {
      onInit: function (canvas, width, height) {
        const movingChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(movingChart);
        movingChart.setOption(getMovingOption());

        return movingChart;
      }
    },
    displayDate: '4月10日',
    nowDate: '',
    nowYear: '',
    endDate: '',
    detailData: [
      {
        data: '30%',
        title: '深睡比例'
      },
      {
        data: '7h30min',
        title: '入睡时长'
      },
      {
        data: 0,
        title: '心率突高次数'
      },
      {
        data: '23:00',
        title: '上床时间'
      },
      {
        data: 12,
        title: '呼吸速率突高次数'
      },
      
      {
        data: '24:00',
        title: '入睡时间'
      },
      {
        data: '7:40',
        title: '清醒时间'
      },
      {
        data: '8:00',
        title: '起床时间'
      }
    ],
    heartRateData: [
      {
        data: '72次/分',
        title: '当晚平均心率'
      },
      {
        data: '72次/分',
        title: '体制基准心率'
      },
      {
        data: '72次/分',
        title: '长期平均心率'
      },
    ],
    breathRateData: [
      {
        data: '72次/分',
        title: '当晚平均呼吸速率'
      },
      {
        data: '72次/分',
        title: '体制基准呼吸速率'
      },
      {
        data: '72次/分',
        title: '长期平均呼吸速率'
      },
    ],
    noiseData: [
      {
        data: '12%',
        title: '深睡比例'
      },
      {
        data: '4%',
        title: '浅睡比例'
      }
    ],
    movingData: '12次'
  },
  /**
   * 初始化日期选择插件
   */
  initDatePicker :function() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    this.setData({
      displayDate: month + '月' + day + '日',
      nowYear: year + ' 今天'
    })

    if (month.toString().length == 1) {
      month = '0' + month;
    }
    if (day.toString().length == 1) {
      day = '0' + month;
    }

    let str = year + '-' + month + '-' + day; 

    this.setData({
      endDate: str,
      nowDate: str,
    })
  },
  /**
   * 选择日期改变
   */
  bindDateChange: function (e) {
    let year = e.detail.value.slice(0, 4);
    let month = e.detail.value.slice(5,7);
    let day = e.detail.value.slice(8, 10);

    if (month.slice(0, 1) == '0') {
      
      month = month.slice(1, 2)
    }
    if (day.slice(0, 1) == '0') {

      day = day.slice(1, 2)
    }

    console.log(this.data.endDate);

    if (this.data.endDate === e.detail.value) 
      this.setData({
        nowYear: year + ' 今天'
      })
    else 
      this.setData({
        nowYear: year
      })
    
    this.setData({
      nowDate: e.detail.value,
      displayDate: month + '月' + day + '日',
      
    })
  },
  /**
   * 请求所有的数据
   */
  getAllData: () => {
    wx.request({
      url: 'report/sleep',
      method: 'GET',
      data: this.data.nowDate
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initDatePicker();
    console.log()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // chart.setOption(heartRateOption);


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

function getHeartRateOption() {
  return {
      legend: {
        data: ['nan'], //跟下面的name对应
        show: true, //写成false不行
        left: -1000 //为了隐藏
      },
      grid: {
        left: 20,
        right: 10,
        bottom: 10,
        top: 10,
        containLabel: true
      },
      xAxis: {
        boundaryGap: false,
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 14,

          }
      },
      yAxis: {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 14,

          }
      },
      series: [
        {
         
          type: 'line',
          smooth: true,
          
          lineStyle: {
          
          },
          data: [
            ['23:50', 52], ['00:00', 55], ['00:10', 62], ['00:20', 55], ['00:30', 51], ['00:40', 59], ['00:50', 52], 
            ['01:00', 48], ['01:10', 56], ['01:20', 60], ['01:30', 52], ['01:40', 60], ['01:50', 49], ['02:00', 58],
            ['03:10', 55], ['03:20', 62], ['03:30', 42], ['03:40', 55], ['03:50', 57], ['04:00', 59],
            ['04:10', 56], ['04:20', 59], ['04:30', 62], ['04:40', 50], ['04:50', 59], ['05:00', 50],
            ['05:10', 52], ['05:20', 40], ['05:30', 54], ['05:40', 60], ['05:50', 60], ['06:00', 59],
            ['07:10', 50], ['07:20', 48], ['07:30', 55], ['07:40', 48], ['07:50', 62], ['08:00',48]
          ],
          
        }
      ]
    
  }
}

function getBreathRateOption() {
  return {

  }
}

function getNoiseOption() {
  return {
    series: [
      {
        color: ["#37A2DA", "#32C5E9", "#67E0E3", "#91F2DE", "#FFDB5C", "#FF9F7F"],
        label: {
          normal: {
            fontSize: 12,
            rich: {}
          }
        },
        type: 'pie',
        radius: '78%',
        center: ['50%', '52%'],
        data: [{
          value: 4,
          name: '深睡'
        }, {
          value: 12,
          name: '浅睡'
        }, {
            value: 84,
            name: '入睡'
        }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            label: {
              // formatter: '{b}: {d}'
            }
          }
        }
      }
    ]
    
  }
}

function getMovingOption() {
  return {

  }
}