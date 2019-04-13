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
      grid: {
        left: 20,
        right: 10,
        bottom: 10,
        top: 10,
        containLabel: true
      },
      xAxis: [
        {
          splitLine: {
            interval: 1
          },
          
          splitLine: {
            show: false
          },
          type: 'value',
          data: [
            '00:00', '00:10', '00:20', '00:30', '00:40', '00:50', '01:00', '01:10', '01:20', '01:30', '01:40', '01:50',
            '02:00', '02:10', '02:20', '02:30', '02:40', '02:50', '03:00', '03:10', '03:20', '03:30', '03:40', '03:50',
            '04:00', '04:10', '04:20', '04:30', '04:40', '04:50', '04:00', '04:10', '04:20', '04:30', '04:40', '04:50',
            '05:00', '05:10', '05:20', '05:30', '05:40', '05:50', '06:00', '06:10', '06:20', '06:30', '06:40', '06:50',
            '07:00', '07:10', '07:20', '07:30', '07:40', '07:50', '08:00', 
            
          ],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 12,
            fontStyle: 'oblique',
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisTick: { show: false },
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666',
            fontSize: 12,

          }
        }
      ],
      series: [
        {
          
          type: 'line',
          data: [
            60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58, 60, 80, 21, 58, 50, 50, 51, 44, 50, 51, 66, 50, 51, 66, 50, 51, 58
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