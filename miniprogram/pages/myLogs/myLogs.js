// pages/myLogs/myLogs.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    userOpenId: "",
    userLog:[],
    userName:"",
    userLogo:""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      userOpenId: options.id,
      userName:options.name,
      userLogo: options.logo
    })
    let status = [];
      let info = app.globalData;
      status=info.statusLst;
      let log = this.data.viewLogs;
      db.collection('feedback').where({
        _openid: this.data.userOpenId
      }).get().then(r=>{
        this.setData({
          userLog:r.data,
        })
        let log = this.data.userLog.reverse();
        for(let i = 0; i < log.length; i++){
          log[i].nickName=this.data.userName;
          log[i].logo=this.data.userLogo; 
          log[i].txtStatus = status[log[i].status];
          log[i].statusObj=info.statusObj;
          log[i].statusLst = info.statusLst;
        }
       
        this.setData({
          userLog: log
        })
        console.log(this.data.userLog);
      });
  },


  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})