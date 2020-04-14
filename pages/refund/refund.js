var app = getApp()
var orderid
var phone
var text

Page({
  data: {
    
  },
  onLoad: function (options) {
      this.setData({
        navH: app.globalData.navHeight,
      })
      orderid = options.orderid
      phone = options.phone
  },
  bindViewTap1: function () {
      wx.makePhoneCall({
          phoneNumber: phone
      })
  },
  settext: function (e) {
      text = e.detail.value
  },
  onok: function (e) {
      if (text){
          wx.showLoading({
              title: '正在提交',
              mask: true
          })
          wx.request({
            url: 'https://apps.zyfuns.com/zyfuns/updata_order_right.cls.php',
              method: 'POST',
              data: {
                  orderid: orderid,
                  text: text
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
                  } else if (res.data.code == 0) {
                      wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 2000,
                          mask: true
                      })
                  }
              }
          })
      }else{
          wx.showModal({
              title: '提示',
              content: '退款理由不能为空'
          })
      }
  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
})