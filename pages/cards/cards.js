var app = getApp()
Page({
  data: {
      array: ['华立校园卡（饭卡）', '电卡'],
      index: 0,
      text1: '充值10元',
      text2: '充值20元',
      text3: '充值50元',
      text4: '充值80元',
      text5: '充值100元'
  },
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    })
      wx.showModal({
          title: '提示',
          content: '该功能正在等待对接'
      })
  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
  bindPickerChange: function (e) {
      this.setData({
          index: e.detail.value
      })
  },
  onbutton: function (e) {
      var that = this
      if (this.data.btnid === e.currentTarget.dataset.btnid) {
          return false;
      } else {
          that.setData({
              btnid: e.currentTarget.dataset.btnid
          })
      }
  },
  bindChange: function (e) {
      var that = this
      if (e.detail.current==0){
          that.setData({ 
              text1: '充值10元',
              text2: '充值20元',
              text3: '充值50元',
              text4: '充值80元',
              text5: '充值100元'
          })
      }else{
          that.setData({
              text1: '15度电',
              text2: '30度电',
              text3: '75度电',
              text4: '120度电',
              text5: '150度电'
          })
      }
      that.setData({ index: e.detail.current })
  }
})