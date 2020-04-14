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
        data: 5
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
            links: res.data.links,
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
  // 点击tab切换 
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  bindChange: function (e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var thisid = e.detail.current
    this.setData({
      currentTab: thisid,
      links:''
    })
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_UserPoints_info.cls.php',
      method: 'POST',
      data: {
        data: thisid,
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
        } else if (res.data.code == 0) {
          wx.showToast({
            title: res.data.msg,
            duration: 2000,
            icon: 'loading',
            mask: false
          })
          this.onShow()
        } else {
          var links = res.data.links
          if (links) {
            switch (thisid) {
              case 0:
                that.setData({  
                  links: links,
                })
                break;
              case 1:
                that.setData({
                  links: links,
                })
                break;
            }
          }
          
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