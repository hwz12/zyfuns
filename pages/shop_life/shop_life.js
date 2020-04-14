var app = getApp()
var text
var shops
Page({
  data: {
    winHeight: 2500,
    currentTab: 0
  },

  onLoad: function(options) {
    shops = options.shops
    wx.showLoading({
      title: '加载中',
      duration: 1000,
      mask: true
    })
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/class/xcx/get_shop_superlist.cls.php',
      method: 'POST',
      data: {
        data: shops
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        setTimeout(function() {
          wx.hideLoading()
        }, 1500)
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
          var shops = res.data.shops
          var shopsH = shops.length * 210 - 38
          that.setData({
            posts_key: shops,
            winHeight: shopsH
          })
        }
      }
    })

    //wx.pageScrollTo({
    //    scrollTop: 37,
    //    duration: 0
    //})
  },
  seted: function (e) {
    text = e.target.dataset.shop
  },
  bindChange: function(e) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var that = this
    var thisid = e.detail.current
    that.setData({
      currentTab: thisid
    })
    wx.request({
      url: 'https://apps.zyfuns.com/class/xcx/get_shop_superlist.cls.php',
      method: 'POST',
      data: {
        data: thisid + 1
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        setTimeout(function() {
          wx.hideLoading()
        }, 1500)
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
          var shops = res.data.shops
          var shopsH = shops.length * 210 - 38
          switch (thisid) {
            case 0:
              that.setData({
                posts_key: shops,
                winHeight: shopsH
              })
              break;
            case 1:
              that.setData({
                posts_key1: shops,
                winHeight: shopsH
              })
              break;
            case 2:
              that.setData({
                posts_key2: shops,
                winHeight: shopsH
              })
              break;
            case 3:
              that.setData({
                posts_key3: shops,
                winHeight: shopsH
              })
          }
        }
      }
    })
    //wx.pageScrollTo({
    //    scrollTop: 37,
    //    duration: 0
    //})
  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /*onPageScroll: function (e) {
      if (e.scrollTop<15){
          wx.pageScrollTo({
              scrollTop: 0,
              duration: 500
          })
      } else if (e.scrollTop < 37){
          wx.pageScrollTo({
              scrollTop: 37,
              duration: 500
          })
      }
  },*/
  bindViewTap: function(e) {
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