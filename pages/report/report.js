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
          height: height
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
  // 初始化日期选择插件
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
      color: ['#37a2da', '#32c5e9', '#67e0e3'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        confine: true
      },
      legend: {
        data: ['热度', '正面', '负面']
      },
      grid: {
        left: 20,
        right: 20,
        bottom: 15,
        top: 40,
        containLabel: true
      },
      xAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      yAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      series: [
        {
          name: '热度',
          type: 'line',
          label: {
            normal: {
              show: true,
              position: 'inside'
            }
          },
          data: [300, 270, 340, 344, 300, 320, 310],
          itemStyle: {

          }
        },
        {
          name: '正面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true
            }
          },
          data: [120, 102, 141, 174, 190, 250, 220],
          itemStyle: {
            // emphasis: {
            //   color: '#32c5e9'
            // }
          }
        },
        {
          name: '负面',
          type: 'bar',
          stack: '总量',
          label: {
            normal: {
              show: true,
              position: 'left'
            }
          },
          data: [-20, -32, -21, -34, -90, -130, -110],
          itemStyle: {
            // emphasis: {
            //   color: '#67e0e3'
            // }
          }
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

  }
}

function getMovingOption() {
  return {

  }
}