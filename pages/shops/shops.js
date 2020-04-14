var app = getApp()
var num = 10
var number = app.globalData.version

Page({
  data: {
    winHeight: 2500,
 
    current:1,
    // 搜索框状态
    inputShowed: false,
    // 搜索框值
    inputVal: "",
    //搜索渲染推荐数据
    list:1,
    onpage:1,
    thisid:1
  },
  onLoad: function() {
    var shopslist = wx.getStorageSync('shopslist');
    console.log(shopslist)
    wx.createSelectorQuery().select('#box').boundingClientRect(rect => {
      this.setData({
        bottom: rect.bottom
      })
    }).exec()
    wx.showLoading({
      title: '加载中',
      duration: 1000,
      mask: true
    })
    var that = this
    this.setData({
      navH: app.globalData.navHeight,
    })
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_shoplist.cls.php',
      method: 'POST',
      data: {
        data: that.data.thisid,
        number:number,
        list:num,
        post:2
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
          var shopsH = shops.length * 235 + 100
          that.setData({
            data:res.data,
            posts_key: shops,
            winHeight: shopsH,
            inputconnent:res.data.barshophot,
            data_top: res.data.data_top,
            onpage: res.data.shop_topstate,
            shop_close: res.data.shop_close
          })
        }
        wx.hideNavigationBarLoading()
      }
    })
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_ShopHot_list.cls.php',
      method: 'POST',
      data: {
        data: 0,
        num: 0
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
          that.setData({
            shops: res.data.shops,
            goods:res.data.goods
          })
          wx.setStorage({
            key: "shopslist",
            data: res.data.shops,
            success: function () {
              console.log('写入value1成功')
            },
            fail: function () {
              console.log('写入value1发生错误')
            }
          })
        }
        
      }
    })

    //wx.pageScrollTo({
    //    scrollTop: 37,
    //    duration: 0
    //})
  },
  onShow:function(){
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_ShopHot_list.cls.php',
      method: 'POST',
      data: {
        data: 0,
        num: 0
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
        }
      }
    })
  },
  //滚动条监听
  onPageScroll: function (e) {
    // wx.createSelectorQuery().select('#box').boundingClientRect(rect => {
    //   this.setData({
    //     bottom: rect.bottom
    //   })
    //   console.log(rect)
    //   console.log(rect.top)
    //   console.log(rect.bottom)
    // }).exec()
    if(this.data.onpage != 5){
      if (e.scrollTop >= this.data.bottom){
        var animation = wx.createAnimation({
          duration: 40000,
          timingFunction: 'ease',
          delay: 1000
        });
        animation.opacity(0.2).translate(100, -100).step()
        this.setData({
          ani: animation.export()
        })
        this.setData({
          headtop: true
        })
      }else{
        this.setData({
          headtop: false
        })
      }
    }
  },

  // 隐藏搜索框样式
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  // 清除搜索框值
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  //点击搜索框
  searchinfo:function(e){
    var that = this
    that.setData({
      inputShowed: true,
      inputVal: e.currentTarget.dataset.searchinfo
    });
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_ShopSearch_list.cls.php',
      method: 'POST',
      data: {
        data: 0,
        searchval: e.currentTarget.dataset.searchinfo
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
          that.setData({
            list: res.data.shops,
          })
        }
      }
    })
  },
  // 获取搜索框值
  inputTyping: function (e) {
    var that = this
    that.setData({
      inputVal: e.detail.value
    });
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_ShopSearch_list.cls.php',
      method: 'POST',
      data: {
        data: 0,
        searchval: e.detail.value,
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
        } else {
          that.setData({
            list: res.data.shops
          })
        }
      }
    })
  },
  // 获取选中推荐列表中的值
  btn_name: function (e) {
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
  },

  bindChange: function(e) {
    var that = this
    var thisid = parseInt(that.data.current)
    that.setData({
      current: thisid,
      thisid:thisid
    })
    var number = app.globalData.version
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_shoplist.cls.php',
      method: 'POST',
      data: {
        data: thisid,
        number: number,
        list:10
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
          var shops = res.data.shops
          var shopsH = shops.length * 235 + 100
          that.setData({
              posts_key: shops,
              winHeight: shopsH
          })
        }
      }
    })
  },
  touchStart(e) {
    this.setData({
      startY: e.changedTouches[0].clientY,
      startX: e.changedTouches[0].clientX,
    });
  },
  touchEnd(e) {
    let x = e.changedTouches[0].clientX;
    let y = e.changedTouches[0].clientY;
    this.setData({
      endY: e.changedTouches[0].clientY,
      endX: e.changedTouches[0].clientX,
    });
    this.touch()
  },
  touch:function(e){
    var that = this
    let turn = "";
    let leftcurrent
    let rightcurrent
    if (this.data.endY - this.data.startY > -60){
      if (this.data.endX - this.data.startX > 120) { 
        wx.showLoading({
          title: '加载中',
          mask: false
        })      //左滑
        turn = "left";
        if (that.data.current > 1){
          leftcurrent = parseInt(that.data.current) - 1
        }else{
          leftcurrent = parseInt(that.data.current)
        }
        that.setData({
          current: leftcurrent
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        this.bindChange()
      } else if (this.data.endX - this.data.startX < -120) {   //右滑
        wx.showLoading({
          title: '加载中',
          mask: false
        })
        
        turn = "right";
        if (that.data.current < 5) {
          rightcurrent = parseInt(that.data.current) + 1
        } else {
          rightcurrent = parseInt(that.data.current)
        }
        that.setData({
          current: rightcurrent
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 1500)
        this.bindChange()
      }
    }
  },
  swichNav: function(e) {
    var that = this;
    that.setData({
      current: e.currentTarget.dataset.current
    })  
    this.bindChange()
  },

  bindViewTap: function(e) {
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_shoplist.cls.php',
      method: 'POST',
      data: {
        data: this.data.thisid,
        number: number,
        list: num,
        post: 2
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
          var shops = res.data.shops
          var shopsH = shops.length * 235 + 100
          that.setData({
            data: res.data,
            posts_key: shops,
            winHeight: shopsH,
            inputconnent: res.data.barshophot,
            data_top: res.data.data_top,
            onpage: res.data.shop_topstate,
            shop_close: res.data.shop_close
          })
        }
        wx.hideNavigationBarLoading()
      }
    })
    var shopstate = e.currentTarget.dataset.state
    var shopid = e.currentTarget.dataset.shopid
    this.goshop(shopstate,shopid);
  },
  goshop: function (shopstate,shopid) {
    if (shopstate == 2) {
      wx.navigateTo({
        url: '../shop_details/shop_details?shopid=' + shopid
      })
    } else {
      wx.showModal({
        title: '提示',
        content: this.data.shop_close
      })
    }
  },
      
  
  // getphone:function(e){
    // wx.request({
    //   url: 'https://dgm.ngua.xin/class/app/xyp/get_user_orderinfo.cls.php',
    //   method: 'POST',
    //   data: {
    //     data: 0
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     'cookie': 'PHPSESSID=' + app.globalData.phpsessId
    //   },
    //   success: function (res) {
    //     var phone = res.data.phone
    //     wx.makePhoneCall({
    //       phoneNumber: phone
    //     })
    //   }
    // })
  //   wx.makePhoneCall({
  //     phoneNumber: e.currentTarget.dataset.phone,
  //       })
  // }
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {

  }
})