var app = getApp()
var page = 0
var supermarket = 2
Page({
  data: {
    banner: true,
    hide: true,
    navH: 0,
    autoplay: true,
    interval: 3500,
    duration: 1500,
    swiperCurrent: 0,
    posts_key:[],
  },
  onLoad: function() {
    // wx.hideShareMenu();
    var that = this;
    var number = app.globalData.version
    that.setData({
      navH: app.globalData.navHeight,
    })
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_homepage_banner.cls.php',
      method: 'POST',
      data: {
        id: 1,
        number: number
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        if (res.data.code == -1) {
          wx.showToast({
            title: '登陆超时',
            icon: 'none',
            duration: 2000,
            mask: true
          })

          setTimeout(function() {
            wx.redirectTo({
              url: '/pages/index/index'
            })
          }, 2000)
        } else {
          that.setData({
            banner: false,
            posts_key: res.data.banners,
            interval: res.data.interval,
            duration: res.data.duration,
            getname: res.data,
            king: res.data.king
          })
          if (res.data.swiperCurrent) {
            that.setData({
              autoplay: res.data.autoplay,
              swiperCurrent: res.data.swiperCurrent
            })
          }
        }
      }
    })

    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_news_noticelist.cls.php',
      method: 'POST',
      data: {
        id: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        if (res.data.notice_list) {
          that.setData({
            data: res.data,
            notice_list: res.data.notice_list
          })
        }
      }
    })

  
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_home_discount.cls.php',
      method: 'POST',
      data: {
        id: 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        console.log(res)
        console.log(res.data)
        console.log(res.data.user_state)
        if (res.data.user_state == 1) {
          that.setData({
            showModal: true
          })
        }
        that.setData({
          do: res.data,
        })
      }
    })
  },

  click: function() {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        if (res.result.substr(0, 45) == "https://zyfuns.com/class/scanLogin.cls.php?s=") {
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


  bindViewTap: function(e) {
    if (e.currentTarget.dataset.url != "#") {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  },
  //   if(e.currentTarget.dataset.state == 2) {
  //   wx.navigateTo({
  //     url: '../shop_details/shop_details?shopid=' + e.currentTarget.dataset.shopid
  //   })
  // } else {
  //   wx.showModal({
  //     title: '提示',
  //     content: '此店已打烊'
  //   })
  // }
  gotonews: function(e) {
    wx.navigateTo({
      url: '../noticeinfo/noticeinfo?id=' + e.currentTarget.dataset.id
    })
  },
  gotorepair: function(e) {
    // wx.navigateTo({
    //   url: '../scan/scan', 
    // })
    wx.navigateTo({
      url: '../repair/repair'
    })
  },
  gotoclass: function() {
    wx.navigateTo({
      url: '../timetable/timetable'
    })
  },

  gotograde: function() {
    wx.navigateTo({
      url: '../grade/grade'
    })
  },
  gotofood: function() {
    wx.switchTab({
      url: '../shops/shops'
    })
  },
  gotoexpress: function() {
    wx.showModal({
      title: '提示',
      content: '该功能正在等待对接'
    })
  },
  gotocard: function() {
    wx.navigateTo({
      url: '../cards/cards'
    })
  },
  gotostore: function() {
    if (this.data.king == 5) {
      wx.showModal({
        title: '提示',
        content: '该功能正在等待对接'
      })
    } else {
      wx.navigateTo({
        url: '../stores/stores'
      })
    }
  },
  gotocar: function() {
    wx.showModal({
      title: '提示',
      content: '该功能正在等待对接'
    })
  },



  navigateToMiniProgram() {
    wx.navigateToMiniProgram({
      appId: 'wx04b49937f001fb12',
      path: 'pages/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开其他小程序成功同步触发
        wx.showToast({
          title: '跳转成功'
        })
      }
    })
  },
  // 弹出层里面的弹窗
  ok: function() {
    this.setData({
      showModal: false
    })
  },
  imgok: function() {
    this.setData({
      showModal: false
    })
  },
  goshop: function(e) {
    // if (e.currentTarget.dataset.state == 2) {
    //   wx.navigateTo({
    //     url: '../shop_details/shop_details?shopid=' + e.currentTarget.dataset.shopid
    //   })
    // } else {
    //   wx.showModal({
    //     title: '提示',
    //     content: '此店已打烊'
    //   })
    // }
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    })
    if (e.currentTarget.dataset.url != null) {
      this.setData({
        showModal: false
      })
    }
  },
  receive: function(e) {
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/updata_home_discount.cls.php',
      method: 'POST',
      data: {
        receive_id: e.currentTarget.dataset.receive_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        if (res.data.user_state == 1) {
          that.setData({
            showModal: false
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'success'
          })
        }
      }
    })
  },
  swiperchange: function(e) {
      // console.log("第二" + e.detail.current)
      this.setData({
        swiperCurrent: e.detail.current,
      })
  },
  // onHide(e) {
  //   this.setData({
  //     swiperCurrent: 0,
  //   })
  // },
  get_index: function(e) {
    this.setData({
      swiperCurrent: e.currentTarget.dataset.index,
    })
  },
  
  onShow: function() {
    var that = this

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})