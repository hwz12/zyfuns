var app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onGotUserInfo: function () {
    wx.getUserInfo({
      success(res) {
        app.globalData.userInfo = res.userInfo
        upLoad()
      }
    })
  }
})

function upLoad() {
  wx.login({
    success: function (res) {
      var code = res.code;//登录凭证
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
                  wx.redirectTo({
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