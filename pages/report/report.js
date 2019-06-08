import * as echarts from '../../ec-canvas/echarts';
let heartRateChart = null;
let breathRateChart = null;
let noiseChart = null;
let movingChart = null;
let sleepChart = null;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    echeartRateChart: {
      onInit: function(canvas, width, height) {
        heartRateChart = echarts.init(canvas, null, {

          width: width,
          height: height,

        });
        canvas.setChart(heartRateChart);
        heartRateChart.setOption(getHeartRateOption());

        return heartRateChart;
      }
    },
    ecbreathRateChart: {
      onInit: function(canvas, width, height) {
        breathRateChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(breathRateChart);
        breathRateChart.setOption(getBreathRateOption());

        return breathRateChart;
      }
    },
    ecnoiseChart: {
      onInit: function(canvas, width, height) {
        noiseChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(noiseChart);
        noiseChart.setOption(getNoiseOption());

        return noiseChart;
      }
    },
    ecmovingChart: {
      onInit: function(canvas, width, height) {
        movingChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(movingChart);
        movingChart.setOption(getMovingOption());

        return movingChart;
      }
    },
    ecsleepChart: {
      onInit: function(canvas, width, height) {
        sleepChart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(sleepChart);
        sleepChart.setOption(getSleepOption());

        return sleepChart;
      }
    },
    
    displayDate: '',
    nowDate: '',
    nowYear: '',
    endDate: '',
    markData: [0,0,0],
    detailData: [{
        data: '0%',
        title: '深睡比例'
      },
      {
        data: '0',
        title: '入睡时长'
      },
      {
        data: 0,
        title: '心率突高次数'
      },
      {
        data: '00:00',
        title: '上床时间'
      },
      {
        data: 0,
        title: '呼吸速率突高次数'
      },

      {
        data: '00:00',
        title: '入睡时间'
      },
      {
        data: '0:00',
        title: '清醒时间'
      },
      {
        data: '0:00',
        title: '起床时间'
      }
    ],
    heartRateData: [{
        data: '0次/分',
        title: '当晚平均心率'
      },
      {
        data: '0次/分',
        title: '体制基准心率'
      },
      {
        data: '0次/分',
        title: '长期平均心率'
      },
    ],
    breathRateData: [{
        data: '16次/分',
        title: '当晚平均呼吸速率'
      },
      {
        data: '17次/分',
        title: '体制基准呼吸速率'
      },
      {
        data: '14次/分',
        title: '长期平均呼吸速率'
      },
    ],
    noiseData: [{
        data: '否',
        title: '是否打鼾'
      },
      {
        data: '30~40',
        title: '基准环境噪音毫伏'
      },
      {
        data: '36',
        title: '当前噪音毫伏'
      }
    ],
    sleepData: [{
        data: '0%',
        title: '深睡比例'
      },
      {
        data: '0%',
        title: '浅睡比例'
      }
    ],
    movingData: '0'
  },
  /**
   * 初始化日期选择插件
   */
  initDatePicker: function() {
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
      day = '0' + day;
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
  bindDateChange: function(e) {
    let year = e.detail.value.slice(0, 4);
    let month = e.detail.value.slice(5, 7);
    let day = e.detail.value.slice(8, 10);

    if (month.slice(0, 1) == '0') {
      month = month.slice(1, 2)
    }
    if (day.slice(0, 1) == '0') {
      day = day.slice(1, 2)
    }

  
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
    this.getAllData();
  },
  
  /**
   * 请求所有的数据
   */
  getAllData: function() {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://www.ed1son.cn:11118/report/sleepallnight?date=' + this.data.nowDate + '&id=1',

       // url: 'report/sleep',
      method: 'get',
      success: (res) => {
        
        let report = res.data.data.report;
        
        let briefReport = res.data.data.briefReport;

        console.log(briefReport)

        this.setData({
          'detailData[0].data': report.deepPer + '%',
          'detailData[1].data': report.duringSleepTime,
          'detailData[2].data': report.heartHighTimes, 
          'detailData[3].data': report.inBedTime,
          'detailData[4].data': report.breathHighTimes,
          'detailData[5].data': report.inSleepTime,
          'detailData[6].data': report.outSleepTime,
          'detailData[7].data': report.outBedTime,

          'markData[0]': report.envScore,
          'markData[1]': report.timeScore,
          'markData[2]': report.qualityScore,

          'sleepData[0].data': report.deepPer + '%',
          'sleepData[1].data': 100 - report.deepPer + '%',

          'heartRateData[0].data': briefReport.heartAvg,
          'heartRateData[1].data': briefReport.heartStd,
          'heartRateData[2].data': briefReport.heartLong,

          
          'breathRateData[0].data': briefReport.breathAvg,
          'breathRateData[1].data': briefReport.breathStd,
          'breathRateData[2].data': briefReport.breathLong,

          
          // 'noiseData[0].data': briefReport.breathAvg,
          'noiseData[1].data': briefReport.envStd,
          'noiseData[2].data': briefReport.envAvg,

          movingData: briefReport.signal,


        })

        let breathList = res.data.data.breathList;
        let envList = res.data.data.envList;
        let heartList = res.data.data.heartList;
        let signalList = res.data.data.signalList;
        
        
        function setData(dataList, type) {
          let dataSet = [];
          for (let i = 0; i < dataList.length; i++) {
            let item = dataList[i];


            let hour = new Date(item.time).getHours() < 10 ? '0' + new Date(item.time).getHours() : new Date(item.time).getHours();
            let min = new Date(item.time).getMinutes() < 10 ? '0' + new Date(item.time).getMinutes() : new Date(item.time).getMinutes();;
            let time = hour + ':' + min;
            
           
            let data = [time, item[type]];
            

            dataSet.push(data);
            
          }
          return dataSet;
        }

        
        // 心率图
        heartRateChart.setOption({
          series: [{
            data: setData(heartList, 'heartAvg'),
          }]
        })

        // 噪音图
        noiseChart.setOption({
          series: [{
            data: setData(envList, 'envAvg'),
          }]
        })
        // 呼吸速率图
        breathRateChart.setOption({
          series: [{
            data: setData(breathList, 'breathAvg'),
          }]
        })
        // 体动图
        movingChart.setOption({
          series: [{
            data: setData(signalList, 'signal'),
          }]
        })
        // 深睡比例图
        sleepChart.setOption({
          series: [{
            data: [{
              value: report.deepPer,
              name: '深睡'
            }, {
              value: 100 - report.deepPer,
              name: '浅睡'
            }],
          }]
        })
        wx.hideLoading();
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.initDatePicker();
    this.getAllData();
    
  }
})

function getHeartRateOption() {
  return {
    legend: {
      data: ['chart'], //跟下面的name对应
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
        fontSize: 13,
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
        fontSize: 13,
      }
    },
    series: [{
      symbol: 'none',
      name: 'chart',
      type: 'line',
      itemStyle: {
        color: '#32C5E9'
      },
      lineStyle: {
        color: '#32C5E9'
      },
      data: [
        // ['23:50', 54],
        // ['23:55', 56],
        // ['00:00', 55],
        // ['00:05', 53],
        // ['00:10', 56],
        // ['00:15', 57],
        // ['00:20', 55],
        // ['00:25', 54],
        // ['00:30', 52],
        // ['00:35', 54],
        // ['00:40', 53],
        // ['00:45', 56],
        // ['00:50', 52],
        // ['00:55', 55],
        // ['01:00', 54],
        // ['01:05', 52],
        // ['01:10', 55],
        // ['01:15', 54],
        // ['01:20', 56],
        // ['01:25', 57],
        // ['01:30', 52],
        // ['01:35', 54],
        // ['01:40', 57],
        // ['01:45', 58],
        // ['01:50', 58],
        // ['01:55', 57],
        // ['02:00', 58],
        // ['02:05', 57],
        // ['02:10', 57],
        // ['02:15', 55],
        // ['02:20', 56],
        // ['02:25', 55],
        // ['02:30', 54],
        // ['02:35', 55],
        // ['02:40', 54],
        // ['02:45', 58],
        // ['02:50', 56],
        // ['02:55', 54],
        // ['03:00', 57],
        // ['03:05', 58],
        // ['03:10', 55],
        // ['03:15', 58],
        // ['03:20', 56],
        // ['03:25', 59],
        // ['03:30', 52],
        // ['03:35', 52],
        // ['03:40', 55],
        // ['03:45', 53],
        // ['03:50', 57],
        // ['03:55', 55],
        // ['04:00', 59],
        // ['04:05', 54],
        // ['04:10', 56],
        // ['04:15', 55],
        // ['04:20', 59],
        // ['04:25', 55],
        // ['04:30', 58],
        // ['04:35', 54],
        // ['04:40', 58],
        // ['04:45', 52],
        // ['04:50', 59],
        // ['04:55', 59],
        // ['05:00', 50],
        // ['05:05', 54],
        // ['05:10', 52],
        // ['05:15', 53],
        // ['05:20', 50],
        // ['05:25', 56],
        // ['05:30', 54],
        // ['05:35', 55],
        // ['05:40', 56],
        // ['05:45', 58],
        // ['05:50', 56],
        // ['05:55', 58],
        // ['06:00', 54],
        // ['06:05', 55],
        // ['06:10', 56],
        // ['06:15', 58],
        // ['06:20', 56],
        // ['06:25', 55],
        // ['06:30', 54],
        // ['06:35', 56],
        // ['06:40', 59],
        // ['06:45', 55],
        // ['06:50', 57],
        // ['06:55', 59],
        // ['07:00', 58],
        // ['07:05', 57],
        // ['07:10', 55],
        // ['07:15', 59],
        // ['07:20', 58],
        // ['07:25', 54],
        // ['07:30', 55],
        // ['07:35', 52],
        // ['07:40', 58],
        // ['07:45', 55],
        // ['07:50', 50],
        // ['07:55', 54],
        // ['08:00', 57]
      ],

    }]

  }
}

function getBreathRateOption() {
  return {
    legend: {
      data: ['chart'], //跟下面的name对应
      show: true, //写成false不行
      left: -1000 //为了隐藏
    },
    grid: {
      left: 10,
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
        fontSize: 13

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
        fontSize: 13,

      }
    },
    series: [{
      symbol: 'none',
      name: 'chart',
      type: 'line',
      itemStyle: {
        color: '#32C5E9'
      },
      lineStyle: {
        color: '#32C5E9'
      },
      data: [
        // ['23:50', 18],
        // ['23:55', 17],
        // ['00:00', 18],
        // ['00:05', 16],
        // ['00:10', 16],
        // ['00:15', 18],
        // ['00:20', 16],
        // ['00:25', 15],
        // ['00:30', 16],
        // ['00:35', 17],
        // ['00:40', 18],
        // ['00:45', 16],
        // ['00:50', 18],
        // ['00:55', 16],
        // ['01:00', 18],
        // ['01:05', 15],
        // ['01:10', 16],
        // ['01:15', 15],
        // ['01:20', 16],
        // ['01:25', 18],
        // ['01:30', 17],
        // ['01:30', 16],
        // ['01:35', 16],
        // ['01:40', 18],
        // ['01:45', 17],
        // ['01:50', 15],
        // ['01:55', 16],
        // ['02:00', 17],
        // ['02:05', 15],
        // ['02:10', 16],
        // ['02:15', 16],
        // ['02:20', 17],
        // ['02:25', 16],
        // ['02:30', 18],
        // ['02:35', 18],
        // ['02:40', 16],
        // ['02:45', 15],
        // ['02:50', 15],
        // ['02:55', 18],
        // ['03:00', 16],
        // ['03:05', 17],
        // ['03:10', 18],
        // ['03:15', 15],
        // ['03:20', 17],
        // ['03:25', 18],
        // ['03:30', 16],
        // ['03:35', 18],
        // ['03:40', 18],
        // ['03:45', 19],
        // ['03:50', 19],
        // ['03:55', 17],
        // ['04:00', 17],
        // ['04:05', 19],
        // ['04:10', 18],
        // ['04:15', 18],
        // ['04:20', 15],
        // ['04:25', 17],
        // ['04:30', 15],
        // ['04:35', 18],
        // ['04:40', 17],
        // ['04:45', 16],
        // ['04:50', 16],
        // ['04:55', 17],
        // ['05:00', 19],
        // ['05:10', 17],
        // ['05:15', 16],
        // ['05:20', 18],
        // ['05:25', 17],
        // ['05:30', 15],
        // ['05:35', 16],
        // ['05:40', 18],
        // ['05:45', 16],
        // ['05:50', 18],
        // ['05:55', 18],
        // ['06:00', 16],
        // ['06:05', 17],
        // ['06:10', 16],
        // ['06:15', 18],
        // ['06:20', 16],
        // ['06:25', 15],
        // ['06:30', 16],
        // ['06:35', 18],
        // ['06:40', 16],
        // ['06:45', 18],
        // ['06:55', 16],
        // ['07:00', 18],
        // ['07:05', 16],
        // ['07:10', 17],
        // ['07:15', 16],
        // ['07:20', 18],
        // ['07:25', 19],
        // ['07:30', 19],
        // ['07:35', 15],
        // ['07:40', 15],
        // ['07:45', 16],
        // ['07:50', 16],
        // ['07:55', 18],
        // ['08:00', 18]
      ],

    }]

  }
}

function getSleepOption() {
  return {
    series: [{
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
      // data: [{
      //   value: 27,
      //   name: '深睡'
      // }, {
      //   value: 41,
      //   name: '浅睡'
      // }, {
      //   value: 32,
      //   name: '入睡'
      // }],
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
    }]
  }
}

function getNoiseOption() {
  return {
    legend: {
      data: ['chart'], //跟下面的name对应
      show: true, //写成false不行
      left: -1000 //为了隐藏
    },
    grid: {
      left: 10,
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
        fontSize: 13

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
        fontSize: 13,

      }
    },
    series: [{
      symbol: 'none',

      name: 'chart',
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#32C5E9'
      },
      lineStyle: {
        color: '#32C5E9'
      },
      data: [
        // ['23:50', 38],
        // ['23:55', 37],
        // ['00:00', 38],
        // ['00:05', 36],
        // ['00:10', 36],
        // ['00:15', 38],
        // ['00:20', 36],
        // ['00:25', 35],
        // ['00:30', 36],
        // ['00:35', 37],
        // ['00:40', 38],
        // ['00:45', 36],
        // ['00:50', 38],
        // ['00:55', 36],
        // ['01:00', 38],
        // ['01:05', 35],
        // ['01:10', 36],
        // ['01:15', 35],
        // ['01:20', 36],
        // ['01:25', 38],
        // ['01:30', 37],
        // ['01:30', 36],
        // ['01:35', 36],
        // ['01:40', 38],
        // ['01:45', 37],
        // ['01:50', 35],
        // ['01:55', 36],
        // ['02:00', 37],
        // ['02:05', 35],
        // ['02:10', 36],
        // ['02:15', 36],
        // ['02:20', 37],
        // ['02:25', 36],
        // ['02:30', 38],
        // ['02:35', 38],
        // ['02:40', 36],
        // ['02:45', 35],
        // ['02:50', 35],
        // ['02:55', 38],
        // ['03:00', 36],
        // ['03:05', 37],
        // ['03:10', 38],
        // ['03:15', 35],
        // ['03:20', 37],
        // ['03:25', 38],
        // ['03:30', 36],
        // ['03:35', 38],
        // ['03:40', 38],
        // ['03:45', 39],
        // ['03:50', 39],
        // ['03:55', 37],
        // ['04:00', 37],
        // ['04:05', 39],
        // ['04:10', 38],
        // ['04:15', 38],
        // ['04:20', 35],
        // ['04:25', 37],
        // ['04:30', 35],
        // ['04:35', 38],
        // ['04:40', 37],
        // ['04:45', 36],
        // ['04:50', 36],
        // ['04:55', 37],
        // ['05:00', 39],
        // ['05:10', 37],
        // ['05:15', 36],
        // ['05:20', 38],
        // ['05:25', 37],
        // ['05:30', 35],
        // ['05:35', 36],
        // ['05:40', 38],
        // ['05:45', 36],
        // ['05:50', 38],
        // ['05:55', 38],
        // ['06:00', 36],
        // ['06:05', 37],
        // ['06:10', 36],
        // ['06:15', 38],
        // ['06:20', 36],
        // ['06:25', 35],
        // ['06:30', 36],
        // ['06:35', 38],
        // ['06:40', 36],
        // ['06:45', 38],
        // ['06:55', 36],
        // ['07:00', 38],
        // ['07:05', 36],
        // ['07:10', 37],
        // ['07:15', 36],
        // ['07:20', 38],
        // ['07:25', 39],
        // ['07:30', 39],
        // ['07:35', 35],
        // ['07:40', 35],
        // ['07:45', 36],
        // ['07:50', 36],
        // ['07:55', 38],
        // ['08:00', 38]
      ],

    }]

  }
}

function getMovingOption() {
  return {
    legend: {
      data: ['chart'], //跟下面的name对应
      show: true, //写成false不行
      left: -1000 //为了隐藏
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
    grid: {
      left: 10,
      right: 10,
      bottom: 10,
      top: 10,
      containLabel: true
    },
    series: [{
      name: 'chart',
      type: 'bar',
      itemStyle: {
        color: '#32C5E9'
      },
      data: [
        // ['23:50', 0],
        // ['00:00', 1],
        // ['00:10', 0],
        // ['00:20', 1],
        // ['00:30', 0],
        // ['00:40', 0],
        // ['00:50', 1],
        // ['01:00', 1],
        // ['01:10', 0],
        // ['01:20', 1],
        // ['01:30', 0],
        // ['01:40', 0],
        // ['01:50', 0],
        // ['02:00', 0],
        // ['03:10', 0],
        // ['03:20', 0],
        // ['03:30', 0],
        // ['03:40', 1],
        // ['03:50', 0],
        // ['04:00', 0],
        // ['04:10', 0],
        // ['04:20', 1],
        // ['04:30', 0],
        // ['04:40', 1],
        // ['04:50', 0],
        // ['05:00', 0],
        // ['05:10', 0],
        // ['05:20', 0],
        // ['05:30', 1],
        // ['05:40', 0],
        // ['05:50', 0],
        // ['06:00', 0],
        // ['07:10', 1],
        // ['07:20', 0],
        // ['07:30', 0],
        // ['07:40', 1],
        // ['07:50', 0],
        // ['08:00', 1]
      ],

    }]
  }
}