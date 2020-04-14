// pages/storesDetails/storesDetails.js
var app = getApp()
var types = new Array()
let shopping = new Array()
var payDetaile
var store_id
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x:0,
    y:400,
    groups:0,
    statu: 0,
    num: 1,
    shopping:[],
    shoppingStatu:0,
    total: 0,
    isClose: true
  },
  onChange: function (e) {
    wx.setStorage({
      key: "x",
      data: e.detail.x,
    })
    wx.setStorage({
      key: "y",
      data: e.detail.y,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    store_id = options.store_id
    var that = this
    shopping = new Array()
    var x = wx.getStorageSync('x');
    var y = wx.getStorageSync('y');
    this.setData({
      navH: app.globalData.navHeight,
      x:x,
      y:y
    })
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_StoreGoods.cls.php',
      data: {
        store_id: options.store_id
      },
      header: { 
        "Content-Type": "applicatiSon/x-www-form-urlencoded",
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
         },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        let shops = res.data.shop
        let goods = res.data.goods
        that.setData({
          //shops: res.data.shop,
          goods: res.data.goods
        })
        // console.log(goods)
      },
    })
  },
  onHide: function () {
    if (this.data.isClose) {
      console.log('重新打开')
    }
  },
  goStores: function (e) {
    shopping.splice(0,shopping.length)
    this.setData({ isClose: false })
    wx.redirectTo({
      url: '../stores/stores'
    })
  },
  // 点击分类弹出商品列表
  chooseList: function(e){
    let groups = e.currentTarget.dataset.groups
      this.setData({
        groups: e.currentTarget.dataset.groups
      })
  },
  //打开规格选择列表
  chooseSpecif:function(e){
    let id = e.currentTarget.dataset.id
    let specif = e.currentTarget.dataset.specif
    let name = e.currentTarget.dataset.name
    let price = e.currentTarget.dataset.price
    let num = e.currentTarget.dataset.num
    let spetype = e.currentTarget.dataset.spetype
    let statu = e.currentTarget.dataset.statu
    if (specif != 1){
      this.setData({
        spetype : 0,
        total: 0,
        chooseSpecifPrice:0,
        num:1
      })
    }
    this.setData({
      total: e.currentTarget.dataset.price,
      specif: e.currentTarget.dataset.specif,
      id : e.currentTarget.dataset.id,
      spetype:e.currentTarget.dataset.spetype,
      name: e.currentTarget.dataset.name,
      price : e.currentTarget.dataset.price,
      statu: e.currentTarget.dataset.statu,
      spetype:e.currentTarget.dataset.spetype
    })
    // console.log(spetype)
  },
  closeSpecif:function(e){
    this.setData({
      statu : 0
    })
  },
  // 规格选择
  chooseType:function(e){
    let index = e.currentTarget.dataset.index
    let spegroup = e.currentTarget.dataset.spegroup
    let num = this.data.specif[spegroup].data[index].num
    let chooseSpecifPrice = 0
    let chooseSpecif = []
    let specifId = []
    let specif = this.data.specif
    for (var n = 0; n < this.data.specif[spegroup].data.length; n++) {
      this.data.specif[spegroup].data[n].num = 0;
      if (n == this.data.specif[spegroup].data.length) {
        this.setData({
          specif: specif,
        })
      }
    }
    if (this.data.specif[spegroup].data[index].num != 1) {
      this.data.specif[spegroup].data[index].num = 1
      for (var i = 0; i < this.data.specif.length; i++) {
        for (var n = 0; n < this.data.specif[i].data.length; n++) {
          if (this.data.specif[i].data[n].num > 0) {
            chooseSpecifPrice += parseFloat(specif[i].data[n].price)
            chooseSpecif.push(specif[i].data[n].name)
            specifId.push(specif[i].data[n].id)
            
          } else {
            continue
          }
        }
      }
      this.setData({
        specif: specif,
        chooseSpecifPrice: chooseSpecifPrice,
        chooseSpecif: chooseSpecif,
        specifId: specifId
      });
    }
    else {
      this.data.specif[spegroup].data[index].num = 0
      this.setData({
        specif: specif,
      });
    }
    this.sum()
  },
  reduceNum: function(e){
    let goodsName = e.currentTarget.dataset.name
    let goodsPrice = e.currentTarget.dataset.price
    let num = e.currentTarget.dataset.num
    if (num > 1){
     num = num - 1
      this.data.total = goodsPrice * num
      this.setData({
      num:num,
      total: this.data.total.toFixed(2)
    })
    }
    this.sum() 
  },
  addNum: function(e){
    let goodsName = e.currentTarget.dataset.name
    let goodsPrice = e.currentTarget.dataset.price
    let num = e.currentTarget.dataset.num
    num++
    this.data.total = goodsPrice * num
    this.setData({
      num:num,
      total: this.data.total.toFixed(2)
    })
    this.sum()
  },
  // 加入购物车
  addShopping: function () {
    let id = this.data.id
    if (this.data.spetype == 1) {
       payDetaile = {
        name: this.data.name,
        chooseSpecif: this.data.chooseSpecif,
        total: this.data.total,
        num: this.data.num,
        chooseSpecifPrice: this.data.chooseSpecifPrice,
        price: this.data.price,
        id: this.data.id,
        specifId:this.data.specifId
      }
      console.log(payDetaile)
      console.log(shopping)
      for(let m = 0; m < shopping.length; m++) {
        if (payDetaile.id == shopping[m].id){
          if (shopping[m].specifId != undefined){
            if (payDetaile.specifId.toString() == shopping[m].specifId.toString()) {
              shopping[m].num += payDetaile.num
              let totals = (parseFloat(shopping[m].price) + parseFloat(shopping[m].chooseSpecifPrice)) * shopping[m].num
              shopping[m].total = totals.toFixed(2)
              payDetaile = null
              break
            }
          }
        }
      }
    } else {
       payDetaile = {
        name: this.data.name,
        total: this.data.total,
        num: this.data.num,
        price: this.data.price,
        id: this.data.id
      }
      for(let i = 0; i < shopping.length; i++){
        if(payDetaile.id == shopping[i].id){
          shopping[i].num += payDetaile.num
          console.log(shopping[i].num)
          let totals = parseFloat(shopping[i].price) * shopping[i].num
          shopping[i].total = totals.toFixed(2)
          payDetaile = null
          break
        }
      }
    }
    // console.log(payDetaile)
    // console.log(id)
    // console.log(payShoppingNum)
    if (payDetaile != null){
      shopping.push(payDetaile)
    }
    let payShoppingNum = shopping.length
    this.setData({
      payShoppingNum: payShoppingNum,
      statu: 0,
      shopping: shopping
    })
    console.log(shopping)
  },
  sum:function(){
    // console.log(this.data.chooseSpecifPrice)
    // console.log(this.data.price)
    // console.log(this.data.total)
    // console.log(this.data.num)
    // console.log(this.data.spetype)
    if (this.data.spetype == 1) { 
    let payDetaile = {
      name: this.data.name,
      chooseSpecif: this.data.chooseSpecif,
      total: this.data.total,
      num: this.data.num,
      chooseSpecifPrice: this.data.chooseSpecifPrice,
      price: this.data.price,
      id: this.data.id,
      specifId: this.data.specifId
    }
    }else{
      let payDetaile ={
      name: this.data.name,
      total: this.data.total,
      num: this.data.num,
      price: this.data.price,
      id: this.data.id
    }
    }
    this.data.total = (parseFloat(this.data.price) + parseFloat(this.data.chooseSpecifPrice))*this.data.num
    // console.log(this.data.total)
    // for (var n = 0; n < shopping.length; n++) {
    //   // cond.push(shopping[n].id)
    //   if (this.data.id == shopping[n].id) {
    //     shopping.splice(n, 1, payDetaile)
    //   }
    // }
    this.setData({
      total: this.data.total.toFixed(2)
    })
  },
  shopping: function(){
    let shopping = this.data.shopping
    if (this.data.shoppingStatu == 0){
      this.setData({
        shoppingStatu: 1
      })
    }else{
      this.setData({
        shoppingStatu: 0
      })
    }
    let amountTo = 0
    for(let i = 0; i < shopping.length; i++){
      // console.log(shopping[i].total)
      amountTo += parseFloat(shopping[i].total)
      // console.log(amountTo)
    }
   this.setData({
     amountTo: amountTo.toFixed(2)
   })
    console.log(this.data.amountTo)
  },
  shoppingAddNum:function(e){
    let num = e.currentTarget.dataset.num
    let index = e.currentTarget.dataset.index
    let total = e.currentTarget.dataset.total
    let oneShare = total/num
    shopping[index].num++
    let totals = oneShare * shopping[index].num
    shopping[index].total = totals.toFixed(2) 
    this.setData({
      shopping:shopping
    })
    let amountTo = 0
    for (let i = 0; i < shopping.length; i++) {
      // console.log(shopping[i].total)
      amountTo += parseFloat(shopping[i].total)
      // console.log(amountTo)
    }
    this.setData({
      amountTo: amountTo.toFixed(2)
    })
    console.log(this.data.amountTo)
    console.log(shopping[index].total)
    console.log(shopping)
  },
  shoppingReduceNum:function(e){
      let num = e.currentTarget.dataset.num
      let index = e.currentTarget.dataset.index
      let total = e.currentTarget.dataset.total
      let oneShare = total / num
      let amountTo = 0
      shopping[index].num--
      // if(shopping.length != 0 && shopping[index].num > 1){
      //   shopping[index].num--
      // }
    let totals = oneShare * shopping[index].num
    shopping[index].total = totals.toFixed(2)
    this.setData({
      shopping: shopping
    })
    for (let i = 0; i < shopping.length; i++) {
      // console.log(shopping[i].total)
      amountTo += parseFloat(shopping[i].total)
      // console.log(amountTo)
    }
    this.setData({
      amountTo: amountTo.toFixed(2)
    })
    console.log(this.data.amountTo) 
    if (shopping[index].num < 1) {
      shopping.splice(index, 1)
      let payShoppingNum = shopping.length
      let amountTo = 0
      for (let i = 0; i < shopping.length; i++) {
        // console.log(shopping[i].total)
        amountTo += parseFloat(shopping[i].total)
        // console.log(amountTo)
      }
      this.setData({
        amountTo: amountTo.toFixed(2)
      })
      console.log(this.data.amountTo)
      this.setData({
        payShoppingNum:payShoppingNum,
        shopping: shopping
      })
    }
  },
  gopay:function(e){
    var datas = this.data.shopping
    console.log(datas)
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/create_StoreOrder.cls.php',
      method: 'POST',
      data: {
        data: datas,
        store_id: store_id
        // goods:{
        //   "goods":4,
        //   "store_id":5
        // }
      },
      header: {
        "Content-Type": "applicatison/x-www-form-urlencoded",
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
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
          wx.showToast({
            title: '订单创建成功',
            icon: 'success',
            duration: 2000,
            mask: true
          })

          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/storespay/storespay?orderid=' + res.data.order_id
            })
          }, 2000)
        }
      }
    })
  }
})