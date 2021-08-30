// pages/login/login.js
const db = wx.cloud.database();
const app = getApp();


Page({

  /**
   * Page initial data
   */
  data: {
    avatarUrl: 'cloud://nanyanfb-8g1led9mcc2b037d.6e61-nanyanfb-8g1led9mcc2b037d-1301503242/user-unlogin.png',
    acceptedAvatarUrl: 'cloud://nanyanfb-8g1led9mcc2b037d.6e61-nanyanfb-8g1led9mcc2b037d-1301503242/user-unlogin.png',
    userInfo: {},
    hasUserInfo: false,
    logged: false,
    takeSession: false,
    requestResult: '',
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl'), // 如需尝试获取用户信息可改为false
    userOpenId: "",
    userPrefName:"",
    oldUser: false,
    isExpand:false,
    rgChosen: false, 
    keyInput:"",
    isAdmin: false,
    isSuperAdmin: false,
    newIndexShow: {},
    newBackgroundEnd: {},
    isHide: false,
    counter: 0
  },
  handleSetting(){
    wx.navigateTo({
      url: '/pages/setting/setting',
    })
  },

  handleCode(){
    this.setData({
      isExpand: true
    })
  },

  onShow: function () {
    if (wx.canIUse('hideHomeButton')) {
      wx.hideHomeButton()
    }
  },

  handleWrite(){
    wx.navigateTo({
      url: '/pages/feedback/feedback',
    })
  },
  handleCommunity(){
    let admin = false;
    if (this.data.isAdmin || this.data.isSuperAdmin){
      admin=true;
    }
    wx.navigateTo({
      url: '/pages/viewLog/viewLog?isAdmin='+admin,
    })
  },
  handleMy(){
    wx.navigateTo({
      url: '/pages/myLogs/myLogs?id='+this.data.userOpenId+"&name="+this.data.userPrefName+"&logo="+this.data.acceptedAvatarUrl,
    })
  },
  handleKeyInput(e){
    this.setData({
      keyInput: e.detail.value
    })
  },

  profileHandler:function(e){
    if (!this.data.rgChosen){
      this.setData({
        rgChosen: true
      })
    }
    let levelOfAcceptance = e.detail.value;
    if (levelOfAcceptance=="true"){
      if (this.data.avatarUrl == 'cloud://nanyanfb-8g1led9mcc2b037d.6e61-nanyanfb-8g1led9mcc2b037d-1301503242/user-unlogin.png'){
          this.getUserProfile();
      } else {
        this.setData({
          acceptedAvatarUrl: this.data.avatarUrl,
        })
      }
      
    } else {
      this.setData({
        acceptedAvatarUrl:'cloud://nanyanfb-8g1led9mcc2b037d.6e61-nanyanfb-8g1led9mcc2b037d-1301503242/user-unlogin.png',
      })
    }
  },
  formSubmit(e){
    if (!e.detail.value.input) {
      wx.showToast({
        title: "未输入昵称",
        icon: 'none',
        mask: true
      });
      return;
    }
    if (!this.data.rgChosen) {
      wx.showToast({
        title: "未选择头像",
        icon: 'none',
        mask: true
      });
      return;
    }
    this.setData({
      userPrefName: e.detail.value.input.trim(),
    })
    let isAdmin = false;
    let isSuperAdmin = false;
    let passwordFalse = false;
    let _this = this;
      let info = app.globalData;
      let key = this.data.keyInput.trim();
      if (key != undefined && key){
        if (key===info.admin_passcode){
          isAdmin = true;
        } else if (key===info.superadmin_passcode){
          isSuperAdmin = true;
        } else {
          passwordFalse = true;
          console.log("password false!!")
          this.setData({
            keyInput: ""
          })
          wx.showToast({
            title: "管理员密码错误",
            icon: 'none',
            mask: true
          });
          return;
        }
      }
      db.collection('users').where({
        prefName: this.data.userPrefName
      }).get().then(r=>{
        if(r.data.length!=0){
          wx.hideLoading();
          wx.showToast({
            icon:"error",
            title: '昵称已存在！',
          })
        } else {
          let _this = this;
          wx.showLoading({
            title: '信息存储中...',
          });
          db.collection("users").add({
            data:{
              prefName: this.data.userPrefName,
              logo: this.data.acceptedAvatarUrl,
              userOpenId: this.data.userOpenId,
              isAdmin: isAdmin,
              isSuperAdmin: isSuperAdmin
            }
          }).then(res=> {
            wx.hideLoading();
            this.setData({
              sumbitSuccess: true,
              isAdmin: isAdmin,
              isSuperAdmin: isSuperAdmin
            })
            app.globalData.isAdmin = this.data.isAdmin;
            app.globalData.isSuperAdmin = this.data.isSuperAdmin;
            app.globalData.nickName = this.data.userPrefName;
            app.globalData.icon = this.data.acceptedAvatarUrl;
            wx.showToast({
              title: "上传成功！",
              icon:"success",
              duration:1000
            });
            
            setTimeout(function(){
              wx.setNavigationBarTitle({
                title: "用户主页"
              });
              _this.setData({
                oldUser:true
              })
            }, 1000);
          })
        }
      });
/*     if (passwordFalse){
      console.log("password false!!")
      this.setData({
        keyInput: ""
      })
    } */
    
    
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    let that = this
    setTimeout(function(){
      var NewTop = wx.createAnimation({
        duration: 1500,
        timingFunction: 'ease-out',
        delay: 0
      })
      NewTop.opacity(1).translateY('40px').step();
      that.setData({
        newIndexShow: NewTop.export()
      })
      var newBackgroundEnd = wx.createAnimation({
        delay: 1600,
        duration: 800,
        timingFunction: 'ease-out'
      })
      newBackgroundEnd.opacity(0).scale(1.4).step();
      that.setData({
        newBackgroundEnd: newBackgroundEnd.export()
      })
    },500)
  },
  animationEnd(){
    if (this.data.counter == 0){
      this.setData({
        counter: 1
      })
    } else {
      this.setData({
        isHide: true
      })
      wx.showLoading({
        title: '加载中...',
      })
      
      getApp().setUp().then(v=>{
        if (wx.getUserProfile) {
          this.onGetOpenid();
        }
      }) 
    }
    
    /* this.setData({
      isHide: true
    })
    wx.showLoading({
      title: '加载中...',
    })
    getApp().setUp().then(v=>{
      if (wx.getUserProfile) {
        that.onGetOpenid();
      }
    }) */
  },
  getUserProfile() {

    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          acceptedAvatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
      })
    }
  },

  onGetOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setData({
          userOpenId: res.result.openid
        })
        app.globalData.openid = res.result.openid
        const datab = wx.cloud.database();
        let openId = this.data.userOpenId
        let _this = this;
        datab.collection('users').where({
          _openid: openId
        }).get().then(r=>{
          wx.hideLoading({
          })
          if(r.data.length!=0){
            this.setData({
              oldUser:true,
              acceptedAvatarUrl: r.data[0].logo,
              userPrefName: r.data[0].prefName.trim(),
              isAdmin: r.data[0].isAdmin,
              isSuperAdmin: r.data[0].isSuperAdmin
            });
            app.globalData.isAdmin = this.data.isAdmin;
            app.globalData.isSuperAdmin = this.data.isSuperAdmin;
            app.globalData.nickName = this.data.userPrefName;
            app.globalData.icon = this.data.acceptedAvatarUrl;
            wx.setNavigationBarTitle({
              title: "用户主页"
            });
            /* setTimeout(function(){
              wx.showLoading({
                title:"登陆中..."
              });
              _this.directToFeedback();
            }, 1000); */
          }
        })
        
        this.setData({
          canIUseGetUserProfile: true,
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        showwx.showToast({
          title: '获取id失败',
        })
      }
    })
  },
})