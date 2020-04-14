var app = getApp()
Page({
  data: {
    
  },
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    })
    
  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
  bindViewTap: function (e) {
        wx.navigateTo({
              url: '../webpage/webpage?url=https://apps.zyfuns.com/page/xcx_about_page.php'
        })
  },
  bindViewTap1: function (e) {
      wx.navigateTo({
          url: '../video/video'
      })
  }
})