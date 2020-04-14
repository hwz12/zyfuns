var app = getApp()

Page({
  data: {
    
  },
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    })
      
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
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
  add_ad: function () {
      wx.navigateTo({
          url: '/pages/addad/addad'
      })
  },
  updelete: function (e) {
      var num = this.data.data.address.length
      console.log(num)
      if(num > 1){
          wx.showModal({
              title: '提示',
              content: '是否删除该地址',
              success: function (res) {
                  if (res.confirm) {
                      wx.showLoading({
                          title: '正在提交',
                          mask: true
                      })
                      wx.request({
                          url: 'https://apps.zyfuns.com/zyfuns/update_useraddress_del.cls.php',
                          method: 'POST',
                          data: {
                              address: e.currentTarget.dataset.id
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
                                      title: '保存成功',
                                      icon: 'success',
                                      duration: 2000,
                                      mask: true
                                  })

                                  setTimeout(function () {
                                      wx.redirectTo({
                                          url: '/pages/manageaddress/manageaddress'
                                      })
                                  }, 2000)
                              } else {
                                  wx.showToast({
                                      title: '保存失败',
                                      icon: 'none',
                                      duration: 2000,
                                      mask: true
                                  })

                                  setTimeout(function () {
                                      wx.redirectTo({
                                          url: '/pages/manageaddress/manageaddress'
                                      })
                                  }, 2000)
                              }
                          }
                      })
                  } else if (res.cancel) {
                      console.log('用户点击取消')
                  }
              }
          })
      }
  }
})