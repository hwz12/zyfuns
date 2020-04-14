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
  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
})