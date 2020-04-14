var app = getApp()
var num
var logistnum
var text
var orderid

Page({
  data: {
      score: [1, 1, 1, 0, 0],
      scores: [1, 1, 1, 0, 0],
      filePath:""
  },
  onLoad: function (options) {
      this.setData({
        navH: app.globalData.navHeight,
      })
      num = 3
      text = ""
      var that = this
      orderid = options.orderid
      wx.request({
          url: 'https://apps.zyfuns.com/class/xcx/get_orderinfo_simple.cls.php',
          method: 'POST',
          data: {
              order_id: options.orderid
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': 'PHPSESSID=' + app.globalData.phpsessId
          },
          success: function (res) {
              if (res.data.code == 1) {
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
                  that.setData({
                      info: res.data
                  })
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
  onscore: function (e) {
      var that = this
      num = e.currentTarget.dataset.num
      switch (num) {
          case 0:
              that.setData({
                  score: [1,0,0,0,0]
              })
              num = 1
              break;
          case 1:
              that.setData({
                  score: [1, 1, 0, 0, 0]
              })
              num = 2
              break;
          case 2:
              that.setData({
                  score: [1, 1, 1, 0, 0]
              })
              num = 3
              break;
          case 3:
              that.setData({
                  score: [1, 1, 1, 1, 0]
              })
              num = 4
              break;
          case 4:
              that.setData({
                  score: [1, 1, 1, 1, 1]
              })
              num = 5
      }
  },
  onscores: function (e) {
      var that = this
    logistnum = e.currentTarget.dataset.logistnum
    console.log(logistnum)
    switch (logistnum) {
          case 0:
              that.setData({
                  scores: [1,0,0,0,0]
              })
          logistnum = 1
              break;
          case 1:
              that.setData({
                  scores: [1, 1, 0, 0, 0]
              })
          logistnum = 2
              break;
          case 2:
              that.setData({
                  scores: [1, 1, 1, 0, 0]
              })
          logistnum = 3
              break;
          case 3:
              that.setData({
                  scores: [1, 1, 1, 1, 0]
              })
          logistnum = 4
              break;
          case 4:
              that.setData({
                  scores: [1, 1, 1, 1, 1]
              })
          logistnum = 5
      }
  },
  settext: function (e) {
      text = e.detail.value
  },
  //商品图片上传
  upload: function (e) {
    var that = this;
    var arr = new Array();
    wx.chooseImage({
      //一次性最多选择的图片张数，不写默认为9张。
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        //图片临时路径，可以作为img标签的src属性显示图片
        const filePath = res.tempFilePaths;
        arr = arr.concat(that.data.filePath);
        that.setData({
          filePath: filePath
        })
        console.log(filePath)
      },
    })
  },
  //图片预览
  preview: function (e) {

    wx.previewImage({
      current: e.target.dataset.id,
      urls: this.data.filePath
    })
  },
  onok: function (e) {
      const img = this.data.filePath
      var imgs = this.data.filePath
    console.log(imgs)
      wx.showLoading({
          title: '正在提交',
          mask: true
      })
      wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/1.php',
          method: 'POST',
          data: {
              order_id: orderid,
              goodsscore: num,
              logistscore:logistnum,
              text: text
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
              }else if(res.data.code==1){
                  wx.showToast({
                      title: '提交成功',
                      icon: 'success',
                      duration: 2000,
                      mask: true
                })
                wx.navigateBack({
                  delta: 1
                })
                if (imgs != ''){
                  wx.uploadFile({
                    url: 'https://apps.zyfuns.com/zyfuns/upload_order_CommentImage.cls.php',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded',
                      'cookie': 'PHPSESSID=' + app.globalData.phpsessId
                    },
                    filePath: img[0],
                    name: 'file',
                    formData: {
                      'user': 'test'
                    },
                    success: function (res) {
                      console.log(res.data.code)
                      wx.hideLoading()
                      const data = res.data.statusCode
                      wx.showToast({
                        title: '图片上传成功',
                        icon: 'none',
                        // duration: 2500,
                        mask: false,

                      })
                      wx.switchTab({
                        url: '/pages/orders/orders'
                      })
                    },
                    fail: function (error) {
                      wx.showToast({
                        title: '请上传有效照片',
                        icon: 'none',
                        duration: 1500,
                        mask: true,
                      })
                    }
                  })
                }
              }else if(res.data.code==0){
                  wx.showToast({
                      title: '提交失败',
                      icon: 'none',
                      duration: 2000,
                      mask: true
                  })
              }
          }
      })
  }
})