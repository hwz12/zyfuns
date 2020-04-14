var app = getApp()
var orderid
var phone

Page({
    onLoad: function (options) {
      orderid = options.orderid
      this.setData({
        navH: app.globalData.navHeight,
      })
      clearInterval(this.data.myintervalid);
    },
    onShow: function () {
      var aa = 1;
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var that = this
        wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/get_userorder_info.cls.php',
            method: 'POST',
            data: {
                order_id: orderid
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'PHPSESSID=' + app.globalData.phpsessId
            },
            success: function (res) {
                setTimeout(function () {
                    wx.hideLoading()
                }, 1500)
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
                        orderid: orderid,
                        data: res.data,
                        order:res.data.order
                    })
                    phone = res.data.order.shopphone
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
    onPullDownRefresh: function () {
        wx.startPullDownRefresh()
        setTimeout(function () {
            wx.stopPullDownRefresh()
        }, 1500);
    },
    goshop: function (e) {
        wx.redirectTo({
          url: '../shop_details/shop_details?shopid=' + e.currentTarget.dataset.shopid
        })
    },
    bindViewTap: function () {
        wx.setClipboardData({
            data: orderid,
            success: function (res) {
                wx.showToast({
                    title: '复制成功',
                    icon: 'success',
                    duration: 2000
                })
            }
        })
    },
    bindViewTap1: function () {
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    onpay: function (e) {
        wx.redirectTo({
            url: '../pay/pay?orderid=' + orderid
        })
    },
    onrefund: function (e) {
        wx.navigateTo({
            url: '/pages/refund/refund?orderid=' + orderid + '&phone=' + phone
        })
    },
    onfinish: function (e) {
        wx.navigateTo({
            url: '/pages/score/score?orderid=' + orderid
        })
    },
    onevaluate: function (e) {
        wx.navigateTo({
            url: '/pages/score/score?orderid=' + orderid
        })
    },
    onreminder: function (e) {
      wx.showToast({
        title: '催单已成功',
        icon: 'none',
        duration: 1500,
        mask: true
      })
        // wx.request({
        //     url: 'https://apps.zyfuns.com/class/xcx/update_order_reminder.cls.php',
        //     method: 'POST',
        //     data: {
        //         orderid: orderid
        //     },
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'cookie': 'PHPSESSID=' + app.globalData.phpsessId
        //     },
        //     success: function (res) {
        //         wx.hideLoading()
        //         if (res.data.code == 0) {
        //             wx.showToast({
        //                 title: res.data.msg,
        //                 icon: 'none',
        //                 duration: 2000,
        //                 mask: true
        //             })
        //         } else if (res.data.code == 1) {
        //             wx.showToast({
        //                 title: res.data.msg,
        //                 icon: 'success',
        //                 duration: 2000,
        //                 mask: true
        //             })
        //         } else if (res.data.code == -1) {
        //             wx.showToast({
        //                 title: '登陆超时',
        //                 icon: 'none',
        //                 duration: 2000,
        //                 mask: true
        //             })

        //             setTimeout(function () {
        //                 wx.redirectTo({
        //                     url: '/pages/index/index'
        //                 })
        //             }, 2000)
        //         }
        //     }
        // })
    }
})