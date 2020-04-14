var app = getApp()
Page({
  data: {
      
  },
  onLoad: function (options) {
      this.setData({
        navH: app.globalData.navHeight,
      })
      wx.showModal({
          title: '提示',
          content: '该功能正在等待对接'
      })
      
      var mydate = new Date()
      var _month = mydate.getMonth() + 1
      var day = mydate.getDay()
      var date = mydate.getDate()
    console.log(day)
      var _week = Math.round(mydate.getTime() / 1000)
      _week = Math.ceil((_week - 1520179200) / 604800)
      this.setData({
          month: _month,
          week: _week,
          tweek: day
      })

      var day1
      var day2
      var day3
      var day4
      var day5
      var day6
      var day7

      if(day == 1){
          console.log(1)
      }else if(day == 0){
          mydate.setDate(date - 6);
      }else{
          mydate.setDate(date - day + 1);
      }
       
      for (var i = 0; i < 7; i++) {
          switch (i) {
              case 0:
                  day1 = mydate.getDate()
                  break
              case 1:
                  day2 = mydate.getDate()
                  break
              case 2:
                  day3 = mydate.getDate()
                  break
              case 3:
                  day4 = mydate.getDate()
                  break
              case 4:
                  day5 = mydate.getDate()
                  break
              case 5:
                  day6 = mydate.getDate()
                  break
              case 6:
                  day7 = mydate.getDate()
          }
          mydate.setDate(mydate.getDate() + 1)
      }

      this.setData({
          day1: day1,
          day2: day2,
          day3: day3,
          day4: day4,
          day5: day5,
          day6: day6,
          day7: day7
      })
  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
})