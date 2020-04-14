var app = getApp()
var shopid
var array = []
var upgoods
var goods
var goods_data
var group
var ruleindex
var rulegroup
var carstate = 0;
var shopcar
var optional
var shop
var newgroup
var bagnum
var signal
var list
var specifcar
Page({
  data: {
      groupTab: 0,
      total: 0,
      state: 1,
      list:0,
      pack:0,
      put:0,
      num:0,
      frame:false,
      changeid:'',
      currentTab:0,
      scrollLeft:0,
      category:0,
      optional:0,
      i:0,
      signal: 0,
      bagtype:1,
      proInfoWindow: false,
      showModalStatus: false
  },
  onLoad: function (options) {
    upgoods = new Array()
    goods_data = new Array()
    shopcar = new Array()
    specifcar = new Array()
    carstate = 0
    shopcar[carstate] = new Object()
    shopcar[carstate].data = new Array()
    shopid = options.shopid
    shopcar[carstate].type = 0
     wx.clearStorage()
      var that = this
      wx.showLoading({
          title: '加载中',
          mask: true
      })

      wx.request({
          url: 'https://apps.zyfuns.com/zyfuns/get_shopgoods.cls.php',
          method: 'POST',
          data: {
              shop_id: shopid
          },
          header: {
              'content-type': 'application/x-www-form-urlencoded',
              'cookie': 'PHPSESSID=' + app.globalData.phpsessId
          },
          success: function (res) {
              setTimeout(function () {
                  wx.hideLoading()
              }, 1500)
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
                  shopcar[0] = new Object();
                  shopcar[0].data = new Array();
                  shopcar[0].type = 0;
                  var stars = res.data.shop.score
                  var temp_goodsId
                  shop = res.data.shop
                  goods = res.data.goods
                for (var i = 0; i < res.data.goods.length;i++){
                  for (var x = 0; x < res.data.goods[i].goods.length;x++){
                      temp_goodsId = res.data.goods[i].goods[x].id
                      goods_data[temp_goodsId] = new Array()
                      goods_data[temp_goodsId].name = res.data.goods[i].goods[x].name
                      goods_data[temp_goodsId].price = res.data.goods[i].goods[x].price
                      goods_data[temp_goodsId].spetype = res.data.goods[i].goods[x].spetype
                      goods_data[temp_goodsId].specif = res.data.goods[i].goods[x].specif
                      goods_data[temp_goodsId].image = res.data.goods[i].goods[x].image
                      goods_data[temp_goodsId].addprice = res.data.goods[i].goods[x].addprice
                      goods_data[temp_goodsId].num = res.data.goods[i].goods[x].num
                    }
                }
                  that.setData({
                      last: res.data.goods.length-1,
                      shop: res.data.shop,
                      shopinfo:res.data.shopinfo,
                      shopid: shopid,
                      eva:res.data.evaluate,
                      comment:res.data.evaluate.comment,
                      mincharge: res.data.shop.mincharge + '元起送',
                      getdata:res.data
                  })
                  wx.setNavigationBarTitle({
                      title: res.data.shop.name
                  })
                wx.getSystemInfo({

                  success: function (res) {

                    that.setData({

                      winheight: res.windowHeight * 0.8

                    })
                  }

                })
              }
              if(res.data.shop.state==2){
                var goodslength = (res.data.goods.length)*105-5
                  that.setData({
                      goodslength:goodslength,
                      navH: app.globalData.navHeight,
                      navHs: app.globalData.navHeights,
                      goods: goods
                  })
              }else{
                  wx.showModal({
                      title: '提示',
                      content: '此店已打烊',
                      success(res){
                        if(res.confirm){
                          wx.reLaunch({
                            url: '/pages/index/index'
                          })
                        }else{
                          wx.reLaunch({
                            url: '/pages/index/index'
                          })
                        }
                      }
                  })
              }
          }
      })
  },
  onShow: function () {
     
  },
  // 导航箭头返回首页
  goHome: function (e) {
    wx.switchTab({
      url:'/pages/shops/shops'
    })
  },
  //商家电话拨打
  shopphone:function(e){
    wx.makePhoneCall({

      phoneNumber: e.currentTarget.dataset.shopphone,

      success: function () {

        console.log("成功拨打电话")

      },

    })
  },
  //店铺详情点击
  intro: function (e) {
    var that = this;
    //检测手机高度
    wx.getSystemInfo({

      success: function (res) {

        that.setData({

          height: res.windowHeight* 0.73,
          proInfoWindow: true 

        })
      }

    })
    if (e.currentTarget.dataset.index != this.data.list) {
      this.setData({
        list: e.currentTarget.dataset.index
      })
    } else {
      this.setData({
        list: 0
      })
    }
  },
  //评论切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  switchTab:function(e){
    var that = this;
    var thisid = e.detail.current
    that.setData({
      currentTab: thisid
    })
  },

  //商品列表滑动
  slide:function(e){
    group = e.currentTarget.dataset.pend
    this.setData({
      groupTab: e.currentTarget.dataset.pend
    })
  },
  //商品详情弹出
  topH: function (e) {
    var that = this;
    if (e.detail.scrollTop>255){
      this.setData({
        pack: 1,
      })
    }else{
      this.setData({
        pack: 0,
      })
    }
  },
  //分类隐藏
  cate:function(e){
    if (signal == 1){
      this.setData({
        category: 0,
        groupTab: 0,
      })
      signal = 0
    }else{
      this.setData({
        category: 0,
        groupTab: newgroup
      })
    } 
  },
  category:function(e){
      signal = 1
      this.setData({
        category: 1,
      })
  },
  // 弹框
  powerDrawer: function (e) {
    specifcar = new Array()
    rulegroup = e.currentTarget.dataset.rulegroup
    var id=e.currentTarget.dataset.id
    ruleindex = parseInt(e.currentTarget.dataset.ruleindex)
    var name = goods_data[id].name
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    if (this.data.put != 1) {
      this.setData({
        put: 1
      })
    } else {
      this.setData({
        put: 0
      })
    }
    this.setData({
      goods_id:shopid,
      id:e.currentTarget.dataset.id,
      addprice:goods_data[id].price,
      goods_price: goods_data[id].price,
      goods_image: goods_data[id].image,
      goods_name: goods_data[id].name,
      specif: goods_data[id].specif,
      num:goods_data[id].num,
      specifcar: specifcar
    })
  },
  //弹框关闭
  powercolse: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    this.util(currentStatu)
    if (this.data.put != 1) {
      this.setData({
        put: 1
      })
    } else {
      this.setData({
        put: 0
      })
    }
  },
  
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (currentStatu == "close") {

        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)
    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
        
      });
    }
  },
  //规格选择
  toChooseType: function (t) {
    var index = t.currentTarget.dataset.index
    var spegroup = t.currentTarget.dataset.spegroup
    var num = this.data.specif[spegroup].data[index].num
    var specif = this.data.specif
    for (var n = 0; n < this.data.specif[spegroup].data.length; n++) {
        this.data.specif[spegroup].data[n].num = 0;
      if (n == this.data.specif[spegroup].data.length){
        this.setData({
          specif: specif,
        })
        }
    }
    if (this.data.specif[spegroup].data[index].num != 1) {
      
      this.data.specif[spegroup].data[index].num = 1
      this.setData({
        specif:specif,
      });
    }
    else {
      this.data.specif[spegroup].data[index].num = 0
      this.setData({
        specif: specif,
      });
    }
    this.pricesum()
  },
  pricesum: function (){
    var specif = this.data.specif
    var goods_price = 0
    var addprice
    specifcar =new Array()
    var specifcartypeid = new Array()
    for (var i = 0; i < this.data.specif.length; i++) {
      for (var n = 0; n < this.data.specif[i].data.length; n++) {
        if (this.data.specif[i].data[n].num > 0) {
          goods_price += parseFloat(specif[i].data[n].price)
          var specifcartype = specif[i].data[n].name
          specifcartypeid.push(specif[i].data[n].id)
          specifcar.push(specifcartype)
        } else {
          continue
        }
      }
    }
    addprice = parseFloat(goods_price) + parseFloat(this.data.goods_price)
    this.setData({
      addprice:addprice.toFixed(2),
      specifcar: specifcar,
      specifcartypeid: specifcartypeid
    })
  },
  drawer_car:function(e){
    wx.vibrateShort();
    if (this.data.specifcar == undefined || this.data.specifcar =='') {
      wx.showModal({
        title: '提示',
        content: '请选择商品规格'
      })
    }else{
    var currentStatu = e.currentTarget.dataset.statu;
    var optional = e.currentTarget.dataset.optional
    this.util(currentStatu)
    if (this.data.put != 1) {
      this.setData({
        put: 1
      })
    } else {
      this.setData({
        put: 0
      })
    } 
    var goods = this.data.goods
    var carnum = 0
    var num = goods[rulegroup].goods[ruleindex].num
    carnum ++
    if (shopcar[carstate].type == 1 || shopcar[carstate].type == 0){
      num = num + 1
      goods[rulegroup].goods[ruleindex].num = num
    }
    this.setData({
      goods:goods,
      num: carnum
    })
    var addcar = {
      optional:'1',
      name: this.data.goods_name,
      addprice: this.data.addprice,
      num: this.data.num,
      image: this.data.goods_image,
      specifcar: this.data.specifcar,
      id:this.data.id,
      specifcartypeid: this.data.specifcartypeid
    }

      if (shopcar[carstate].data.length == 0) {
        shopcar[carstate] = new Object();
        shopcar[carstate].data = new Array();
        shopcar[carstate].type = 0;
        shopcar[carstate].optionalnum = 0;
      }
      if (shopcar[carstate].type == 0) {
        shopcar[carstate] = new Object();
        shopcar[carstate].data = new Array();
        shopcar[carstate].optionalnum = 0;
        shopcar[carstate].type = addcar.optional;
      } else {
        if (addcar.optional != shopcar[carstate].type && shopcar[carstate].type == 1) {
          wx.showModal({
            title: '点击新建袋子',
            content: '该商品不能添加到自选袋子',
            success: res => {
              if (res.confirm) {
                var that = this
                this.addbag()
              }
            }
          })
        } else if (addcar.optional != shopcar[carstate].type && shopcar[carstate].type == 2) {
          wx.showModal({
            title: '点击新建袋子',
            content: '该商品不能添加到任选袋子',
            success: res => {
              if (res.confirm) {
                var that = this
                this.addbag()
              }
            }
          })
        }
      }
      //开始添加商品新建袋子
      // if (shopcar[carstate].type != 0) {
      //   for (let i = 0; i < shopcar[carstate].data.length; i++) {
      //     if (this.data.id == shopcar[carstate].data[i].id) {
      //       shopcar[carstate].data.splice(i, 1)
      //       break
      //     }
      //   }
      // }
      // if (parseInt(shopcar[carstate].type) == 2) {
      //   if (shopcar[carstate].optionalnum <= 4) {
      //     if (addcar.optional == shopcar[carstate].type || shopcar[carstate].type == 0) {
      //       shopcar[carstate].data.push(addcar);
      //     }
      //   } else {
      //     wx.showModal({
      //       title: '提示',
      //       content: '任选商品每袋上限为5'
      //     })
      //   }
      // }
      if (parseInt(shopcar[carstate].type) == 1) {
        if (addcar.optional == shopcar[carstate].type || shopcar[carstate].type == 0) {
          shopcar[carstate].data.push(addcar);
        }
      }

      this.setData({
        shopcar: shopcar
      })
      this.sum()

    }
  },
  ongroup: function (e) {
    newgroup = e.currentTarget.dataset.current
        this.setData({
            groupTab: e.currentTarget.dataset.current,
            toView: 'group' + e.currentTarget.dataset.current
        })
  },
  funScroll: function (e) {
      var that = this
      for (var i = 0; i <= array.length; i++) {
          if (e.detail.scrollTop>array[i]){
              that.setData({ groupTab: i })
          }
      }
  },
  bindPlus: function (e) {
      wx.vibrateShort();
      var goods = this.data.goods
      var num = 0
      var z =0
      var index = parseInt(e.currentTarget.dataset.index)
      var group = parseInt(e.currentTarget.dataset.group)
      var optional = e.currentTarget.dataset.optional
      var num = this.data.goods[group].goods[index].num
      var goodsid = goods[group].goods[index].id
      if (parseInt(shopcar[carstate].type) == 2 && shopcar[carstate].optionalnum <= 4){
          if (optional == shopcar[carstate].type || shopcar[carstate].data.length == 0) {
              num++
          }
      } else if (parseInt(shopcar[carstate].type) == 1 || shopcar[carstate].type == 0){
        if (optional == shopcar[carstate].type || shopcar[carstate].data.length == 0) {
          num++
        }
      }
        bagnum++
      goods[group].goods[index].num = num
      this.setData({
          goods: goods,
          goods_name: goods[group].goods[index].name,
          addprice: goods[group].goods[index].price,
          num: goods[group].goods[index].num,
          goods_image: goods[group].goods[index].image,
          id: goods[group].goods[index].id,
          specifcar:null
      })
     for (var n = 0; n < carstate; n++){
      for (var i = 0; i < shopcar[n].data.length; i++) {
          if (shopcar[n].data[i].id == goods[group].goods[index].id){
            if (shopcar[n] != shopcar[carstate]){
              this.data.num -= shopcar[n].data[i].num
            }
            num = this.data.num
          }
      }
     }
      var addcar = {
        optional:optional,
        name: this.data.goods_name,
        addprice: this.data.addprice,
        num: num,
        image: this.data.goods_image,
        id: this.data.id,
        specifcar: this.data.specifcar
      }
    if(shopcar[carstate].data.length == 0){
      shopcar[carstate] = new Object();
      shopcar[carstate].data = new Array();
      shopcar[carstate].type = 0;
      shopcar[carstate].optionalnum = 0;
    }
    if (shopcar[carstate].type == 0) {
      shopcar[carstate] = new Object();
      shopcar[carstate].data = new Array();
      shopcar[carstate].optionalnum = 0;
      shopcar[carstate].type = addcar.optional;
    } else {
      if (addcar.optional != shopcar[carstate].type && shopcar[carstate].type==1) {
        wx.showModal({
          title: '点击新建袋子',
          content: '该商品不能添加到自选袋子',
          success: res =>{
            if(res.confirm){
              var that = this
              this.addbag()
            }
          }
        })
      }else if (addcar.optional != shopcar[carstate].type && shopcar[carstate].type == 2) {
        wx.showModal({
          title: '点击新建袋子',
          content: '该商品不能添加到任选袋子',
          success: res => {
            if (res.confirm) {
              var that = this
              this.addbag()
            }
          }
        })
      }
    }
    //开始添加商品新建袋子
    if (shopcar[carstate].type != 0) {
      for (let i = 0; i < shopcar[carstate].data.length; i++) {
        if (this.data.id == shopcar[carstate].data[i].id) {
          shopcar[carstate].data.splice(i, 1)
          break
        }
      }
    }
    if(parseInt(shopcar[carstate].type) == 2){
      if(shopcar[carstate].optionalnum<=4) {
        if (addcar.optional == shopcar[carstate].type || shopcar[carstate].type == 0) {
          shopcar[carstate].data.push(addcar);
        }
      } else{
        if(addcar.num != 0){
          shopcar[carstate].data.push(addcar);
        }
        wx.showModal({
          title: '提示',
          content: '任选商品每袋上限为5'
        })
      } 
    }
    if(parseInt(shopcar[carstate].type) == 1){
      if (addcar.optional == shopcar[carstate].type || shopcar[carstate].type == 0) {
      shopcar[carstate].data.push(addcar);
      }
    }
    this.setData({
      shopcar:shopcar
    })
    this.sum()
  },
  addbag:function(e){
        carstate = shopcar.length
        shopcar[carstate] = new Object();
        shopcar[carstate].data = new Array();
        shopcar[carstate].type = 0;
        shopcar[carstate].optionalnum = 0;
        this.setData({
          shopcar:shopcar
        })
        this.sum()
        wx.showToast({
          title: '袋子添加成功',
          duration: 2000,
          mask: true,
          icon: 'success',
        })
  },
  shoppingaddNum:function(e){
    wx.vibrateShort();
    let goods = this.data.goods
    let goodsid = e.currentTarget.dataset.goodsid
    let num = e.currentTarget.dataset.num
    let index = e.currentTarget.dataset.index
    let bag = e.currentTarget.dataset.goodscar.data
    let bagindex = e.currentTarget.dataset.bagindex
    for (var i = 0; i < this.data.goods.length; i++) {
      for (var x = 0; x < this.data.goods[i].goods.length; x++) {
        if(goods[i].goods[x].id == goodsid){
          if (parseInt(bag[index].optional) != 2) {
            goods[i].goods[x].num++
          } else if (parseInt(bag[index].optional) == 2) {
            if (shopcar[bagindex].optionalnum <= 4) {
              goods[i].goods[x].num++
            } else {
              wx.showModal({
                title: '提示',
                content: '任选商品每袋上限为5'
              })
            }
          }
           this.setData({
             goods:goods
           })
        }
      }
    }
    if (parseInt(bag[index].optional) != 2){
      bag[index].num += 1
    }else if (parseInt(bag[index].optional) == 2){
      if (shopcar[bagindex].optionalnum<=4){
        bag[index].num += 1
      } else {
        wx.showModal({
          title: '提示',
          content: '任选商品每袋上限为5'
        })
      }
    }
    this.data.shopcar[bagindex].data = bag
    this.setData({
      shopcar: this.data.shopcar
    })
    this.sum()
  },
  shoppingReduceNum:function(e){
    wx.vibrateShort();
    let goods = this.data.goods
    let goodsid = e.currentTarget.dataset.goodsid
    let num = e.currentTarget.dataset.num
    let index = e.currentTarget.dataset.index
    let bag = e.currentTarget.dataset.goodscar.data
    let bagindex = e.currentTarget.dataset.bagindex
    for (var i = 0; i < this.data.goods.length; i++) {
      for (var x = 0; x < this.data.goods[i].goods.length; x++) {
        if (goods[i].goods[x].id == goodsid) {
          goods[i].goods[x].num--
          this.setData({
            goods: goods
          })
        }
      }
    }
    bag[index].num --
    if(bag[index].num == 0){
      bag.splice(index,1)
    }
    this.data.shopcar[bagindex].data = bag
    this.setData({
      shopcar: this.data.shopcar
    })
    this.sum()
  },
  bagcontent:function(e){
    carstate = e.currentTarget.dataset.index
    this.setData({
      carstate: carstate
    })
    this.sum()
  },
  sum: function () {
    shopcar = this.data.shopcar
    var goods = this.data.goods
    var min = this.data.shop.mincharge
    var sumnum = 0
    var total = 0
    var totals = 0
    for (var x = 0; x < shopcar.length; x++) {
      var shopgoodsnum = 0
      for (let y = 0; y < shopcar[x].data.length; y++) {
        shopgoodsnum += shopcar[x].data[y].num
        shopcar[x].optionalnum = shopgoodsnum
        if (y < shopcar[x].data.length){
        this.setData({
          optionalnum: shopcar[x].optionalnum
        })
        }
      }
    }
    
    for(var i=0; i<shopcar.length; i++){
      if (shopcar[i].type==2){
        switch (shopcar[i].optionalnum){
          case 1:
            shopcar[i].addprice = shop.optional[0].price
            break
          case 2:
            shopcar[i].addprice=shop.optional[1].price
          break;
          case 3:
            shopcar[i].addprice = shop.optional[2].price
          break;
          case 4:
            shopcar[i].addprice = shop.optional[3].price
          break;
          case 5:
            shopcar[i].addprice = shop.optional[4].price
          break;
        }
      }
      var freeprice = 0
      var selectprice = 0
      if (shopcar[i].type == 1) {
        for(var z=0;z<shopcar[i].data.length;z++){
          freeprice += shopcar[i].data[z].num*shopcar[i].data[z].addprice
          shopcar[i].data[z].groupprice = (shopcar[i].data[z].num * shopcar[i].data[z].addprice).toFixed(2)
        }
        shopcar[i].addprice = freeprice.toFixed(2)
      }
      if(shopcar[i].type == 2){
        selectprice += shopcar[i].addprice
      }
      totals = freeprice + selectprice
      sumnum += shopcar[i].optionalnum
      if (shopcar[i].addprice != undefined){
        total += totals
      }
      this.setData({
        num:sumnum,
        total: total.toFixed(2),
      })
    }
    if (shopcar[carstate].type == 1) {
      this.setData({
        bagtype: shopcar[carstate].type,
        carstate: carstate,
        carstatelength:shopcar.length
      })
    } else if (shopcar[carstate].type == 2) {
      for(var n=0; n<shopcar[carstate].data.length; n++){
      this.setData({
        bagtype: shopcar[carstate].type,
        carstate: carstate,
        carbagnum: shopcar[carstate].optionalnum,
        carbagprice: shopcar[carstate].addprice,
        carbag:shopcar[carstate].data,
        bottomnumber:shopcar[carstate].data[n].num
      })
      }
    }

      if (total == 0) {
          this.setData({
              mincharge: min+'元起送',
              state: 0
          })
      } else if (total < this.data.shop.mincharge) {
          this.setData({
              mincharge: '差' + (min - total).toFixed(2)+ '元起送',
              state: 1
          })
      }else{
          this.setData({
              mincharge: '创建订单',
              state: 2
          })
      }
  },

  carframeopen:function(e){
    var frame = e.currentTarget.dataset.statu;
    this.carutil(frame)
  },
  carframeclose: function (e) {
    var frame = e.currentTarget.dataset.statu;
    this.carutil(frame)
  },
  carutil: function (frame) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })
      //关闭  
      if (frame == "2") {

        this.setData({
          carStatus: false
        });
      }
    }.bind(this), 200)
    // 显示  
    if (frame == "1") {
      this.setData({
        carStatus: true

      });
    }
  },
  establish: function (e) {
    
      if (e.currentTarget.dataset.state==2){
          // wx.showLoading({
          //     title: '订单创建中',
          //     mask: true
          // })
          
          var data = "{"
          for (var i = 0; upgoods['id' + i]; i++) {
              if (i != 0) {
                  data = data + ","
              }
              data = data + '"id' + i + '":"' + upgoods['id' + i] + '",'
              data = data + '"name' + i + '":"' + upgoods['name' + i] + '",'
              data = data + '"price' + i + '":"' + upgoods['price' + i] + '",'
              data = data + '"num' + i + '":"' + upgoods['num' + i] + '"'
          }
          data = data + "}"
          upgoods[0] = 1
        var tip = 0
        var content = '任选商品每个袋子数量不能少于' + parseInt(shop.miniop) +'个'
        for (var x = 0; x < this.data.shopcar.length; x++) {
          if (this.data.shopcar[x].type == 2) {
            if (this.data.shopcar[x].optionalnum < parseInt(shop.miniop)) {
              tip =1
              wx.showModal({
                title: '提示',
                content: content,
              })
            }
          }
        }
        if(tip == 0){ 
          var datas = JSON.stringify(this.data.shopcar)
          wx.request({
            url: 'https://apps.zyfuns.com/text/7.php',
              method: 'POST',
              data: {
                  goods: datas,
                  shopid: shopid
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
                  }else{
                      wx.showToast({
                          title: '订单创建成功',
                          icon: 'success',
                          duration: 2000,
                          mask: true
                      })

                      setTimeout(function () {
                          wx.redirectTo({
                              url: '/pages/pay/pay?orderid=' + res.data.orderid
                          })
                      }, 2000)
                  }
              }
          })
        }
      }
  },
  /**
     * 用户点击右上角分享
     */
  onShareAppMessage: function () {

  }
})