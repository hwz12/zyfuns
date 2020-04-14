var app = getApp()
Page({
  data: {
    // 搜索框状态
    inputShowed: false,
    // 搜索框值
    inputVal: "",
    //搜索渲染推荐数据
    list: [
      { name: "帝霸" },
      { name: "遮天" },
      { name: "道界天下" },
      { name: "菜鸟" },
      { name: "先飞" }
    ]
  },
  // 显示搜索框
  showInput: function () {
    this.setData({
      inputShowed: true
    });
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
  // 获取搜索框值
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log(this.data.inputVal);
  },
  // 获取选中推荐列表中的值
  btn_name: function (res) {
    console.log(res.currentTarget.dataset.index, res.currentTarget.dataset.name);
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
        const img = that.data.filePath
        var imgs = that.data.filePath
        wx.uploadFile({
          url: 'https://apps.zyfuns.com/text/55.php',
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
});
