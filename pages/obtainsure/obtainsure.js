var app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    com:0,
    flag: true
  },
  onLoad:function(){
    this.setData({
      navH: app.globalData.navHeight,
    })
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/Agreement_user.txt',
      method: 'get',
      data: {
        data: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded/application/json',
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
          console.log(res)
          that.setData({
            Article: res.data  //一维数组json编码后对象
          })
        }
      }
    })
  },
  onGotUserInfo: function () {
    if(this.data.com == 0){
      wx.showToast({
        title: '请选阅读并同意状元范协议书',
        icon: 'none',
        duration: 1500
      })
    }else{
      wx.getUserInfo({
        success(res) {
          app.globalData.userInfo = res.userInfo
          upLoad()
        }
      })
    }
  },
  com:function(e){
    if(this.data.com == 0){
      this.setData({
        com:1
      })
    }else{
      this.setData({
        com: 0
      })
    }
  },
  goback: function (e) {
    setTimeout(function () {
      wx.navigateBack({
        delta: 1
      })
    }, 20)
  },
  show: function () {
    this.setData({ 
      flag: false 
    })
  },
  //消失

  hide: function () {
    this.setData({ 
      flag: true 
    })
  },
  refuse:function(){
    wx.switchTab({
      url: '/pages/home/home'
    })
  }
})

function upLoad() {
  wx.login({
    success: function (res) {
      var code = res.code;//登录凭证
      console.log(code)
      if (code) {
        //2、调用获取用户信息接口
        wx.getUserInfo({
          success: function (r) {
            console.log({ encryptedData: r.encryptedData, iv: r.iv, code: res.code })
            //3.请求自己的服务器，解密用户信息 获取unionId等加密信息
            wx.request({
              url: 'https://apps.zyfuns.com/zyfuns/user_login.cls.php',//自己的服务接口地址
              method: 'post',
              data: {
                encryptedData: r.encryptedData,
                iv: r.iv,
                code: res.code
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded',
                //'cookie': 'PHPSESSID=' + app.globalData.phpsessId
              },
              success: function (res) {
                app.globalData.phpsessId = res.data.phpsessid
                if (res.data.code == 0) {
                  wx.navigateTo({
                    url: '/pages/address/address'
                  })
                } else if (res.data.code == 1) {
                  wx.switchTab({
                    url: '/pages/home/home'
                  })
                }
              }
            })
          }
        })
      } else {
        console.log('获取用户登录态失败！')
      }
    }
  })
}