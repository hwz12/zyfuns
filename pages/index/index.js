var app = getApp()
var runData
var jump

Page({
  data: {

  },
  onLoad: function(options) {
    if (options.scene) {
      runData = options.scene
    } else if (options.data) {
      runData = options.data
    }

    wx.showLoading({
      title: '加载中'
    })

    var that = this;
    wx.login({
      success: function(res) {
        console.log(res)
        console.log(res.code)
        if (res.code) {
          wx.request({
            url: 'https://apps.zyfuns.com/zyfuns/user_login.cls.php',
            method: 'POST',
            data: {
              code: res.code,
              wx:1
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              //'cookie': 'PHPSESSID=' + app.globalData.phpsessId
            },
            success: function(res) {
              app.globalData.phpsessId = res.data.phpsessid
              app.globalData.openId = res.data.openid
              app.globalData.userInfo = res.userInfo
              if (res.data.code == 1) {
                if (runData) {
                  var temp = runData.substring(0, 1)
                  var id = runData.substring(1)
                  runData = ""
                  jump = 1
                  if (temp == 'o') {
                    wx.navigateTo({
                      url: '/pages/order_details/order_details?orderid=' + id
                    })
                  } else if (temp == 's') {
                    wx.navigateTo({
                      url: '/pages/shop_details/shop_details?shopid=' + id
                    })
                  } else if (temp == 'n') {
                    wx.navigateTo({
                      url: '/pages/noticeinfo/noticeinfo?id=' + id
                    })
                  } else {
                    wx.switchTab({
                      url: '/pages/home/home'
                    })
                  }
                } else {
                  wx.switchTab({
                    url: '/pages/home/home'
                  })
                }
              } else {
                console.log('获取用户登录态失败！')
                wx.redirectTo({
                  url: '/pages/obtain/obtain'
                })
              }
            }
          })
        }
      }

    })
  },
  onShow: function(options) {
    if (jump == 1) {
      wx.switchTab({
        url: '/pages/home/home'
      })
    }
  }

})