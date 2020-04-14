// pages/integraldetaile/integraldetaile.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    winHeight: 2500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    })
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_UserPoints_info.cls.php',
      method: 'POST',
      data: {
        data: 4
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
        } else {
          that.setData({
            data:res.data,
            list: res.data.list,
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
  integraldetaile:function(e){
    if (e.currentTarget.dataset.end == 2){
      wx.navigateTo({
        url: '../integraldetaile/integraldetaile'
      })
    }
  },
  buy:function(e){
    wx.showModal({
      title: '温馨提示',
      content: '您确定要购买该优惠券吗',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://apps.zyfuns.com/zyfuns/updata_UserPoints_info.cls.php',
            method: 'POST',
            data: {
              discount_id: e.currentTarget.dataset.id
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': 'PHPSESSID=' + app.globalData.phpsessId
            },
            success: function (res) {
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
              } else if (res.data.code == 1){
                wx.showToast({
                  title:res.data.msg,
                  icon: 'success',
                  duration: 2000,
                  mask: false
                })
              } else if(res.data.code == 2){
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000,
                  mask: false
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})