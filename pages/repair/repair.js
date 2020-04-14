// pages/repair/repair.js
var app = getApp()
var imagesPath = new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kindIndex:0,                                             
    companyIndex:0,
    timeIndex:0,
    imagePath:'/images/plus.png',
    describeProblem:'',
    imagesPath:[],
    setImagesPath:[],
    name:'',
    repairAddress:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showModal({
      title: '提示',
      content: '该功能正在等待对接'
    })
    var that = this
    this.setData({
      navH: app.globalData.navHeight,
    })
    // 请求后台维修详情json数据
    wx.request({
      url: 'https://apps.zyfuns.com/class/xcx/get_repair_type.cls.php',
      data: {
        data:0
      },
      header: { "Content-Type": "applicatiSon/x-www-form-urlencoded"},
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function(res) {
        that.setData({
          kind:res.data.type,
          company:res.data.company,
          time:res.data.time
        })
      },
      fail: function(res) {
      },
      complete: function(res) {
      },
    })
  },
  // 选择类型点击事件并处理数据
  kindChange: function(e){
    this.setData({
      kindIndex:e.detail.value
    })
    console.log(e.detail.value)
  },
  // 导航箭头返回首页
  goHome: function (e) {
      wx.switchTab({
      url: '../home/home'
    })
  },
  //描述问题及数据处理
  describeProblem: function(e){
    let that = this;
    let describeProblem = ''
    that.setData({
      describeProblem: e.detail 
    })
    describeProblem = e.detail 
    console.log(describeProblem)
  },
  // 选择图片数据处理
  imgChooes: function(e){
    let that = this
    let imagesPath = that.data.imagesPath
    console.log(imagesPath)
    console.log(e)
    //系统API,让用户在相册中选择图片或者拍照
    wx.chooseImage({
      count: 4,
      success: function(e) {
        console.log(e.tempFilePaths)
        that.setData({
          imagesPath :e.tempFilePaths
        })
      },
    })
  },
  //长按删除图片
  deleteImg1: function (e) {
    let that = this
    let imagesPath = that.data.imagesPath;
    imagesPath.splice(0,1)
    that.setData({
     imagesPath
    })
    console.log(this.data.imagesPath)
  },
  deleteImg2: function (e) {
    let that = this
    let imagesPath = that.data.imagesPath;
    imagesPath.splice(1,1)
    that.setData({
      imagesPath
    })
    console.log(this.data.imagesPath)
  },
  deleteImg3: function (e) {
    let that = this
    let imagesPath = that.data.imagesPath;
    imagesPath.splice(2, 1)
    that.setData({
      imagesPath
    })
    console.log(this.data.imagesPath)
  },
  deleteImg4: function (e) {
    let that = this
    let imagesPath = that.data.imagesPath;
    imagesPath.splice(3, 1)
    that.setData({
      imagesPath
    })
    console.log(this.data.imagesPath)
  },
  //获取报修人姓名
  repairUser: function(e){
    this.setData({
      name: e.detail.value
    })
    console.log(e.detail.value)
  },
  //获取维修地址
  repairAddress: function(e){
    this.setData({
      repairAddress: e.detail.value
    })
    console.log(e.detail.value)
  },
  //获取用户电话
  repairPhone: function (e) {
    this.setData({
      repairPhone: e.detail.value
    })
    console.log(e.detail.value)
  },
  //单位选择
  chooseCompany: function(e){
    this.setData({
      companyIndex: e.detail.value
    })
    console.log(e.detail.value)
  },
  //时间选择
  changeTime: function (e) {
    this.setData({
      timeIndex: e.detail.value
    })
    console.log(e.detail.value)
  },
  // 生成订单
  goDetails: function (e) {
    // wx.switchTab({
    //   url: '../repairDetails/repairDetails'
    // })
    wx.redirectTo({
      url: '../repairDetails/repairDetails'
    })
  },
})

