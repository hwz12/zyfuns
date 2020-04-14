// // pages/stores/stores.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      navH: app.globalData.navHeight,
    })
    var number = app.globalData.version
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_StoreShop_list.cls.php',
      method: 'POST',
      // dataType: 'json',
      // responseType: 'text',
      data: {
        data: 2,
        number: number
      },
      header: {
        //"Content-Type": "applicatiSon/x-www-form-urlencoded",
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function(res) {
        if(res.data.end == 1){
          wx.showModal({
            title: '提示',
            content: '该功能正在等待对接'
          })
        }
        let shops = res.data.shop
        that.setData({
          shops: res.data.list
        })
      },
      fail: function(res) {
        console.log('2')
      },
    })
  },
  goHome: function(e) {
    wx.switchTab({
      url: '../home/home'
    })
  },
  gostoresDetails: function(e) {
    console.log(e.currentTarget.dataset.store_id)
    if (e.currentTarget.dataset.store_state == 2){
      wx.redirectTo({
        url: '../storesDetails/storesDetails?store_id=' + e.currentTarget.dataset.store_id
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '此店已打烊'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})