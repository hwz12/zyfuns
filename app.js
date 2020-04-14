App({
    onLaunch: function () {
      wx.getSystemInfo({
        success: res => {
          //导航高度
          this.globalData.navHeight = res.statusBarHeight + 46;
          this.globalData.navHeights = res.statusBarHeight + 95;
        }, fail(err) {
          console.log(err);
        }
      })
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
      })
      // 下载新版本
      updateManager.onUpdateReady(function () { 
        wx.showModal({
          title: '更新提示',
          content: '更新版本，店铺分类已优化！',
          confirmText: '确认更新',
          cancelText: '取消更新',
          success(res) {
            if (res.confirm) {
              // 重启应用
              updateManager.applyUpdate()
            }
          }
        })
      })
      // 新版本下载失败
      updateManager.onUpdateFailed(function (res) {
        console.log(res)
      })
    },


    globalData: {
        navHeight: 0,
        userinfo: null,
        phpsessId: 1,
        version: '2.5.8'
    }
})