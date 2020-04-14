var app = getApp()
var abc
var num = 0
Page({
    data: {
        winHeight: 2500,
        currentTab: 0,
    },
    onLoad: function () {
      clearInterval(this.data.myintervalid);
      this.setData({
        navH: app.globalData.navHeight,
      })
 
    },
    onShow: function () {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        })
      }
      // this.data.myintervalid = setInterval(function () {
      //   console.log("轮播请求1秒触发一次");
      // }, 1000)
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var number = app.globalData.version
        var that = this
        wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/get_user_orderlist.cls.php',
            method: 'POST',
            data: {
                data: that.data.currentTab,
                num: 0,
                number:number
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
                }else{
                    var order = res.data.order
                    var orderH = order.length * 360
                    that.setData({
                        data:res.data,
                        order: res.data.order,
                        winHeight: orderH
                    })
                }
            }
        })
    },
    bindChange: function (e) {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var that = this
        var thisid = e.detail.current
        abc = e.detail.current
        that.setData({ 
          currentTab: thisid
        })
        wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/get_user_orderlist.cls.php',
            method: 'POST',
            data: {
                data: thisid,
                num: 0
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
                }else if(res.data.show == 5){
                  wx.showToast({
                    title: res.data.msg,
                    icon: 'success',
                    duration: 2000,
                    mask: false
                  })
                  this.onShow()
                }else{
                var orderH = 0
                var order = res.data.order
                if(order){
                    orderH = order.length * 360
                    switch (thisid) {
                        case 0:
                            that.setData({
                                order: order,
                                winHeight: orderH
                            })
                            break;
                        case 1:
                            that.setData({
                                order1: order,
                                winHeight: orderH
                            })
                            break;
                        case 2:
                            that.setData({
                                order2: order,
                                winHeight: orderH
                            })
                            break;
                        case 3:
                            that.setData({
                                order3: order,
                                winHeight: orderH
                            })
                            break;
                        case 4:
                            that.setData({
                                order4: order,
                                winHeight: orderH
                            })
                        case 5:
                          that.setData({
                            order5: order,
                            winHeight: orderH
                          })
                          break;
                        case 6:
                          that.setData({
                            order6: order,
                            winHeight: orderH
                          })
                          break;
                        case 7:
                          that.setData({
                            order7: order,
                            winHeight: orderH
                          })
                    }
                }
                wx.hideLoading()
                }
            }
        })
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
    bindViewTap: function (e) {
        wx.navigateTo({
            url: '../order_details/order_details?orderid=' + e.currentTarget.dataset.orderid
        })
    },
    // onPullDownRefresh: function () {
    //     wx.startPullDownRefresh()
    //     setTimeout(function () {
    //         wx.stopPullDownRefresh()
    //     }, 1500);
    // },
  onReachBottom: function () {
    var that = this;
    // 订单数+10
    num = num + 10;
    
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_user_orderlist.cls.php',
      method: 'POST',
      data: {
        data: that.data.currentTab,
        num: num
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
        } else {
          if (res.data.msg == "已经到底了"){
            wx.showToast({
              title: '已经到底了',
              icon: 'loading',
              duration: 2000
            })
          }else{
            wx.showToast({
              title: '加载中',
              icon: 'loading',
              duration: 2000
            })
          }
          var order = res.data.order
          var orderH = order.length * 360
          that.setData({
            order: res.data.order,
            winHeight: orderH
          })
        }
      }
    })
  },
    oncancel: function (e) {
        var that =this
        wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/updata_order_delete.cls.php',
            method: 'POST',
            data: {
                order_id: e.currentTarget.dataset.orderid
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
                if(res.data.code==1){
                    wx.request({
                      url: 'https://apps.zyfuns.com/zyfuns/get_user_orderlist.cls.php',
                        method: 'POST',
                        data: {
                            data: abc,
                            num: 0
                        },
                        header: {
                            'content-type': 'application/x-www-form-urlencoded',
                            'cookie': 'PHPSESSID=' + app.globalData.phpsessId
                        },
                        success: function (res) {
                            wx.showToast({
                                title: '订单已取消',
                                icon: 'none',
                                duration: 1500,
                                mask: true
                            })
                            setTimeout(function () {
                                that.onShow()
                            }, 1500)
                        }
                    })
                }
            }
        })
    },
    gotoshop: function (e) {
      wx.navigateTo({
        url: '../shop_details/shop_details?shopid=' + e.currentTarget.dataset.shopid
      })
    },
    onpay: function (e) {
        wx.navigateTo({
            url: '../pay/pay?orderid=' + e.currentTarget.dataset.orderid
        })
    },
    onreminder: function (e) {
        // wx.showLoading({
        //     title: '催单已成功',
        //     mask: 'success'
        // })
      wx.showToast({
        title: '催单已成功',
        icon: 'none',
        duration: 1500,
        mask: true
      })
    },
    onfinish: function (e) {
        wx.navigateTo({
            url: '/pages/score/score?orderid=' + e.currentTarget.dataset.orderid
        })
    },
    onevaluate: function (e) {
        wx.navigateTo({
            url: '/pages/score/score?orderid=' + e.currentTarget.dataset.orderid
        })
    },
    onorder:function(e){
      wx.request({
        url: 'https://apps.zyfuns.com/zyfuns/create_order_again.cls.php',
        method: 'POST',
        data: {
          order_id: e.currentTarget.dataset.orderid,
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
          }else if(res.data.code == 0){
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              duration: 2000,
              mask: false
            })
          }else{
            wx.navigateTo({
              url: '/pages/pay/pay?orderid=' + res.data.orderid
            })
          }
        }
      })
        
    },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})