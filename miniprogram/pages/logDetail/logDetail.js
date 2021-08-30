// pages/logDetail/logDetail.js
const db = wx.cloud.database();
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    imgLink:[],
    logId:"",
    message:"",
    type:"",
    nickName:"",
    containImage:true,
    logo:"",
    title:"",
    date:"",
    statusIndex:-1,
    statusLst:[],
    statusObj:{},
    isAdmin:false

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      imgLink: JSON.parse(decodeURIComponent(options.imgLink)),
       logId:options.logId,
       message:options.message,
       type:options.type,
       nickName:options.nickName,
       logo:options.logo,
       date:options.date,
       title:options.title,
       statusIndex:options.statusIndex,
       
    });
    if (options.isAdmin==="true"){
      this.setData({
        isAdmin:true
      })
    }
      let info = app.globalData;
      this.setData({
        statusLst: info.statusLst,
        statusObj:info.statusObj
      })
      if (this.data.imgLink.length == 0){
        this.setData({
          containImage:false
        })
      }
      wx.setNavigationBarTitle({
        title: "from "+this.data.nickName
      });
  },
  img_preview: function(e){
    let imgClicked = e.currentTarget.dataset.url;
    wx.previewImage({
      current: imgClicked,
      urls: this.data.imgLink,
    })
  },
  onChangeStatus(e){
    let changeTo = e.detail;
    db.collection("feedback").doc(this.data.logId).update({
      data: {
        status: changeTo
      }
    }).then(r=>{
      this.setData({
        statusIndex: changeTo
      })
      const eventChannel = this.getOpenerEventChannel()
      eventChannel.emit('acceptDataFromB', {text: this.data.statusLst[this.data.statusIndex]})
      wx.showToast({
        title: "更改状态成功",
      })
    })

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