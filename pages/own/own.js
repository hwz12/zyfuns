var app = getApp()

Page({
  data: {

  },
  onLoad: function(options) {

  },
  myaddress: function() {
    wx.navigateTo({
      url: '../manageaddress/manageaddress'
    })
  },
  zyfuns: function() {
    wx.navigateTo({
      url: '../zyfuns/zyfuns'
    })
  },
  integral: function () {
    wx.navigateTo({
      url: '../integral/integral'
    })
  },
  click: function() {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {//传参
        console.log(res);
        if (res.result.substr(0, 45) == "https://zyfuns.com/class/scanLogin.cls.php?s=") {
          console.log(res.result.substring(45));
          wx.navigateTo({
            url: '../pclogin/pclogin?sess=' + res.result.substring(45)
          })
        } else {
          wx.showToast({
            title: '二维码无效',
            icon: 'none',
          })
        }
      },
      fail: (res) => {},
      complete: (res) => {}
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})