var WxParse = require('../../wxParse/wxParse.js');
var app = getApp()
var id
var article

Page({
  clear: '',
  //页面的初始数据
  data: {
    state: 'none',
    num: 1,
  },
  //生命周期函数--监听页面加载
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    })
    var that = this
    id = options.id
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_news_noticeinfo.cls.php',
      method: 'POST',
      data: {
        notice_id: id
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
            html: res.data.html,
            author: res.data.author,
            title: res.data.title,
            timein: res.data.timein,
            data:res.data,
          })
          article = res.data.html
          WxParse.wxParse('article', 'html', article, that, 5);
        }
        wx.setNavigationBarTitle({
          title: res.data.author
        })
      }
    })

    wx.request({
      url: 'https://apps.zyfuns.com/class/xcx/update_news_record.cls.php',
      method: 'POST',
      data: {
        notice_id: id
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
  shop:function(e){
    if (e.currentTarget.dataset.state == 2) {
      wx.navigateTo({
        url: '../shop_details/shop_details?shopid=' + e.currentTarget.dataset.shopid
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '此店已打烊'
      })
    }
  }
})