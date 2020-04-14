var app = getApp()
var _orderid

Page({
  data: {
    
  },
  onLoad: function (options) {
      this.setData({
        navH: app.globalData.navHeight,
      })
      _orderid = options.orderid
  },
  onShow: function () {
      var that = this
      wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/get_user_addresslist.cls.php',
          method: 'POST',
          data: {
              data: 1
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': 'PHPSESSID=' + app.globalData.phpsessId
          },
          success: function (res) {
              that.setData({
                  data: res.data
              })
          }
      })
  },
  select_ad: function (e) {
      wx.showLoading({
          title: '正在提交',
          mask: true
      })
      wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/update_order_address.cls.php',
          method: 'POST',
          data: {
              orderid: _orderid,
              name: e.currentTarget.dataset.name,
              phone: e.currentTarget.dataset.phone,
              addressid: e.currentTarget.dataset.id
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': 'PHPSESSID=' + app.globalData.phpsessId
          },
          success: function (res) {
              wx.hideLoading()
              if (res.data.code == -1) {
                  wx.showToast({
                      title: '登陆超时',
                      icon: 'none',
                      duration: 2000,
                      mask: true
                  })

                  setTimeout(function () {
                      wx.redirectTo({
                          url: '/pages/index/index'
                      })
                  }, 2000)
              } else if (res.data.code == 1) {
                  wx.showToast({
                      title: res.data.msg,
                      icon: 'success',
                      duration: 2000,
                      mask: true
                  })

                  setTimeout(function () {
                      wx.navigateBack({
                          delta: 1
                      })
                  }, 2000)
              } else {
                  wx.showToast({
                      title: res.data.msg,
                      icon: 'none',
                      duration: 2000,
                      mask: true
                  })

                  setTimeout(function () {
                      wx.navigateBack({
                          delta: 1
                      })
                  }, 2000)
              }
          }
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