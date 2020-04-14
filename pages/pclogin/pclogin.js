var app = getApp()
var sess = "";
//https://zyfuns.com/class/scanLogin.cls.php
Page({
    data: {

    },
    onLoad: function(options) {
        var that = this
        sess = options.sess;
        console.log(sess)
    },

    // 登录
    onGotUserInfo: function() {
        wx.request({
            url: 'https://zyfuns.com/class/scanLogin.cls.php',
            method: 'POST',
            data: {
                openid: app.globalData.openId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'cookie': 'PHPSESSID=' + sess
            },
            success: function (res) {
                if (res.data.code == 1) {
                    wx.showToast({
                        title: '登陆成功',
                        icon: 'none',
                    })
                    setTimeout(function () {
                        wx.redirectTo({
                            url: '/pages/index/index'
                        })
                    }, 2000)
                } else {
                    wx.showToast({
                        title: '登陆失败',
                        icon: 'none',
                    })
                    wx.redirectTo({
                        url: '../own/own',
                    })

                }
            }
        })
    },

    // 取消登录
    cancel: function() {
        wx.navigateBack(1);
    }

})