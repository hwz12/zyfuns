// pages/repairDetails/repairDetails.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:0,
    score:50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      navH: app.globalData.navHeight,
    })
    let timer;
    timer = () => {
      setTimeout(() => {
        const val = this.data.value;
        this.setData({ value: val < 100 ? val + 10 : 100 });
        timer();
      }, 100);
    }
    timer();
  },
  goRepair: function (e) {
    // wx.switchTab({
    //   url: '../repairDetails/repairDetails'
    // })
    wx.redirectTo({
      url: '../repair/repair'
    })
  },
})