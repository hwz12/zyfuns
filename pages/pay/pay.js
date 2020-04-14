var app = getApp()
var orderid
var text
var text1

Page({
    data: {

    },
    onLoad: function (options) {
        orderid = options.orderid
    },
    onShow: function () {
        wx.showLoading({
            title: '加载中',
            mask: true
        })
        var that = this
        this.setData({
          navH: app.globalData.navHeight,
        })
        wx.request({
            url: 'https://apps.zyfuns.com/zyfuns/3.php',
            method: 'POST',
            data: {
                order_id: orderid
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
                } else if (res.data.code == 0){
                  wx.showToast({
                    title: '订单已过期',
                    icon: 'none',
                    duration: 2000,
                    mask: true
                  })
                  setTimeout(function () {
                    wx.navigateBack({
                      delta: 1
                    })
                  }, 2000)
                }else {
                    var shopcar = res.data.shopcar
                    for(var n=0; n<shopcar.length; n++){
                      for(var i=0; i<shopcar[n].data.length; i++){
                        if (shopcar[n].type == 1){
                          shopcar[n].data[i].groupprice = (shopcar[n].data[i].num * shopcar[n].data[i].addprice).toFixed(2),
                          that.setData({
                            groupprice: shopcar[n].data[i].groupprice
                          })
                        }
                      }
                    }

                    text = res.data.text
                    text1 = res.data.text
                    if (res.data.code != 0) {
                        that.setData({
                            data: res.data,
                            shopcar:res.data.shopcar
                        })
                    } else {
                        wx.showToast({
                            title: '订单已过期',
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
    onpay: function () {
        if (text1 == text) {
            wx.request({
                url: 'https://apps.zyfuns.com/zyfuns/5.php',
                method: 'POST',
                data: { 
                    order_id: orderid,
                    text: text
                },
                header: {
                    'content-type': 'application/x-www-form-urlencoded',
                    'cookie': 'PHPSESSID=' + app.globalData.phpsessId
                },
                success: function (res) {
                  console.log(res)
                    wx.requestPayment({
                        'timeStamp': res.data.timeStamp.toString(),
                        'nonceStr': res.data.nonceStr,
                        'package': res.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.sign,
                        'success': function (res) {
                            wx.redirectTo({
                                url: '/pages/order_details/order_details?orderid=' + orderid
                            })
                        },
                        'fail': function (res) {
                            wx.hideToast()
                            wx.showToast({
                                title: '支付已取消',
                                icon: 'none',
                                duration: 2000
                            })
                        }
                    })
                }
            })
        }
    },
    remark: function (e) {
        if (text != e.detail.value) {
            wx.showModal({
                title: '提示',
                content: '是否保存备注？',
                success: function (res) {
                    if (res.confirm) {
                        wx.showLoading({
                            title: '正在保存',
                            mask: true
                        })

                        wx.request({
                          url: 'https://apps.zyfuns.com/zyfuns/update_order_text.cls.php',
                            method: 'POST',
                            data: {
                                order_id: orderid,
                                text: e.detail.value
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
                                    text = e.detail.value
                                    text1 = e.detail.value
                                    wx.hideLoading()
                                    wx.showToast({
                                        title: '保存成功',
                                        icon: 'success',
                                        duration: 1000
                                    })
                                }
                            }
                        })
                    } else if (res.cancel) {
                        this.setData({
                            text: text
                        })
                        text1 = 1323
                    }
                }
            })
        }
    },
    goselect: function () {
        wx.navigateTo({
            url: '/pages/selectad/selectad?orderid=' + orderid
        })
    }
})