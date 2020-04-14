var app = getApp()
var avatarUrl
var nickName
Page({
  data: {
    showView: true,
    layer0: '请选地址',
    lay: 1,
    ab: 1,
    username: 1,
    userphone: 1
  },
  onLoad: function (options) {
    this.setData({
      navH: app.globalData.navHeight,
    })
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_address.cls.php',
      method: 'POST',
      data: {
        layer: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
          that.setData({
            posts_key: res.data.address
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
  getaddress: function (e) {
    var that = this
    var l = e.currentTarget.dataset.layer
    var name = e.currentTarget.dataset.name

    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_address.cls.php',
      method: 'POST',
      data: {
        layer: e.currentTarget.dataset.layer,
        data0: e.currentTarget.dataset.dataa,
        data1: e.currentTarget.dataset.datab,
        data2: e.currentTarget.dataset.datac,
        data3: e.currentTarget.dataset.datad,
        data4: e.currentTarget.dataset.datae,
        data5: e.currentTarget.dataset.dataf
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
        } else if (res.data.code != 1) {
          switch (l) {
            case 1:
              that.setData({
                ab: 1,
                layer0: name
              })
              break;
            case 2:
              that.setData({
                ab: 2,
                layer1: name,
                dataa: e.currentTarget.dataset.dataa
              })
              break;
            case 3:
              that.setData({
                ab: 3,
                layer2: name,
                dataa: e.currentTarget.dataset.dataa,
                datab: e.currentTarget.dataset.datab
              })
              break;
            case 4:
              that.setData({
                ab: 4,
                layer3: name,
                dataa: e.currentTarget.dataset.dataa,
                datab: e.currentTarget.dataset.datab,
                datac: e.currentTarget.dataset.datac
              })
              break;
            case 5:
              that.setData({
                ab: 5,
                layer4: name
              })
          }

          that.setData({
            lay: l + 1,
            posts_key: res.data.address
          })
        } else {
          switch (l) {
            case 1:
              that.setData({
                ab: 1,
                layer0: name
              })
              break;
            case 2:
              that.setData({
                ab: 2,
                layer1: name
              })
              break;
            case 3:
              that.setData({
                ab: 3,
                layer2: name
              })
              break;
            case 4:
              that.setData({
                ab: 4,
                layer3: name
              })
              break;
            case 5:
              that.setData({
                ab: 5,
                layer4: name
              })
          }

          that.setData({
            showView: false,
            addressid: e.currentTarget.dataset.adid
          })
        }
      }
    })
  },
  layera: function () {
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_address.cls.php',
      method: 'POST',
      data: {
        layer: 0
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
          that.setData({
            layer0: '请选地址',
            ab: 1,
            lay: 1,
            showView: true,
            posts_key: res.data.address
          })
        }
      }
    })
  },
  layerb: function (e) {
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_address.cls.php',
      method: 'POST',
      data: {
        layer: 1,
        data0: e.currentTarget.dataset.a
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
          that.setData({
            layer1: '请选地址',
            ab: 2,
            lay: 2,
            showView: true,
            posts_key: res.data.address
          })
        }
      }
    })
  },
  layerc: function (e) {
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_address.cls.php',
      method: 'POST',
      data: {
        layer: 2,
        data0: e.currentTarget.dataset.a,
        data1: e.currentTarget.dataset.b
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
          that.setData({
            layer2: '请选地址',
            ab: 3,
            lay: 3,
            showView: true,
            posts_key: res.data.address
          })
        }
      }
    })
  },
  layerd: function (e) {
    var that = this
    wx.request({
      url: 'https://apps.zyfuns.com/zyfuns/get_address.cls.php',
      method: 'POST',
      data: {
        layer: 3,
        data0: e.currentTarget.dataset.a,
        data1: e.currentTarget.dataset.b,
        data2: e.currentTarget.dataset.c
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'PHPSESSID=' + app.globalData.phpsessId
      },
      success: function (res) {
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
          that.setData({
            layer3: '请选地址',
            ab: 4,
            lay: 4,
            showView: true,
            posts_key: res.data.address
          })
        }
      }
    })
  },
  getname: function (e) {
    this.setData({
      username: e.detail.value,
      nameleng: e.detail.cursor
    })
  },
  // getstudent: function (e) {
  //   this.setData({
  //     userstudent: e.detail.value,
  //     studentleng: e.detail.cursor
  //   })
  // },
  getphone: function (e) {
    this.setData({
      userphone: e.detail.value,
      phoneleng: e.detail.cursor
    })
  },
  // getid: function (e) {
  //   this.setData({
  //     userid: e.detail.value,
  //     idleng: e.detail.cursor
  //   })
  // },
  postok: function (e) {
    if (this.data.nameleng < 2) {
      wx.showModal({
        title: '提示',
        content: '姓名不规范'
      })
    } else if (this.data.nameleng == undefined) {
      wx.showModal({
        title: '提示',
        content: '姓名不能为空'
      })
    } 
    // else if (this.data.studentleng != 12) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '学号不规范'
    //   })
    // }
    else if (this.data.phoneleng != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号不规范'
      })
    } 
    // else if (this.data.idleng != 18) {
    //   wx.showModal({
    //     title: '提示',
    //     content: '身份证不规范'
    //   })
    // } 
    else {
      var iname = this.data.username
      var iphone = this.data.userphone
      var iaddress = this.data.addressid

      if (app.globalData.userInfo.avatarUrl) {
        var iimage = app.globalData.userInfo.avatarUrl
        var iwxname = app.globalData.userInfo.nickName
      } else {
        var iimage = ''
        var iwxname = ''
      }

      wx.request({
        url: 'https://apps.zyfuns.com/zyfuns/user_register.cls.php',
        method: 'POST',
        data: {
          name: iname,
          phone: iphone,
          address: iaddress,
          image: iimage,
          wxname: iwxname
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': 'PHPSESSID=' + app.globalData.phpsessId
        },
        success: function (res) {
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
              title: '提交成功',
              icon: 'success',
              duration: 1500,
              mask: true
            })

            setTimeout(function () {
              wx.switchTab({
                url: '/pages/home/home'
              })
            }, 1500)
          }
        }
      })
    }
  },
  reset: function (e) {
    wx.redirectTo({
      url: '/pages/address/address'
    })
  }
})