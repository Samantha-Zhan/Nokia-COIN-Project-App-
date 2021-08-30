// pages/feedback/feedback.js

/**
 * when click on add button; tap click event
 * - 调取小程序内置选择图片的api
 * - 获取到图片路径，数据
 * - 图片路径存到data变量中
 * - 循环显示
 */

/**
 * 点击component时delete
 * - 获取被点击index
 * - 获取data中图片数据
 * - 根据index从数组中删除
 */

/**
 * 点击提交
 * - 获取textarea内文本
 * - 对文本合法性验证
 * - 验证通过用户选择图片上传到图片服务器返回外网链接
 * - 文本域和外网图片路径一起提交到服务器
 * - 清空当前页面
 * - 返回上一页
 */

const db = wx.cloud.database();
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    chooseImages:[],
    topic: [],
    currentTopicIndex: -1,
    textarea_content: "",
    topic_content: "",
    fileIDs:[],
    shortMes:"",
    title:"",
    status:""
  },
  onLoad:function(options){
    this.setData({
      status: app.globalData.statusLst,
      topic: app.globalData.topicLst
  });
  },
  // 外网图片路径array
  UploadImgs:[],
  // click "+"
  handleChooseImg(){
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: (res)=>{
        let newImages = this.data.chooseImages.concat(res.tempFilePaths);
        this.setData({chooseImages: newImages});
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  handleRemoveImg(e){
    const i = e.currentTarget.dataset.index;
    let chooseImgs = this.data.chooseImages;
    chooseImgs.splice(i, 1);
    this.setData({
      chooseImages: chooseImgs
    })
  },
  itemTapHandler(e){
    const i = e.currentTarget.dataset.index;
    this.setData({
      currentTopicIndex: i,
      topic_content: this.data.topic[i]
    });
  },
  getNowDate() {
    let dateArr = [];
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) { 
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    dateArr.push(year);
    dateArr.push(month);
    dateArr.push(strDate);
    return dateArr;
},

  handleTextInput(e){
    this.setData({
      textarea_content: e.detail.value
    });
  },

  handleInputInput(e){
    this.setData({
      title: e.detail.value
    })
  },

  viewAllHandler(e){
    wx.navigateTo({
      url: '/pages/viewLog/viewLog',
    })
  },
  handleFormSubmit(){
    var _this = this
    const text_value = _this.data.textarea_content.trim();
    if(!text_value.trim()){
      // illegal, empty
      wx.showToast({
        title: "未填写内容",
        icon: 'none',
        mask: true
      });
    } else if (!_this.data.title.trim()) {
      wx.showToast({
        title: "未填写标题",
        icon: 'none',
        mask: true
      });
    } else if (!_this.data.topic_content.trim()) {
      wx.showToast({
        title: "未选择问题种类",
        icon: 'none',
        mask: true
      });
    } else {
      // 注意api不能上传多个文件
        wx.showLoading({
          title: '信息上传中...',
          mask:true
        })
        var isSuccess = true;
        let promiseArr = [];
        for (let i = 0; i < this.data.chooseImages.length; i++) {
        promiseArr.push(new Promise((reslove, reject) => {
          let item = this.data.chooseImages[i];
          let suffix = /\.\w+$/.exec(item)[0];//正则表达式返回文件的扩展名
          wx.cloud.uploadFile({
          cloudPath: new Date().getTime() + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            this.setData({
              fileIDs: this.data.fileIDs.concat(res.fileID)
            });
            reslove();
          },
          fail: res=>{
            isSuccess = false;
             _this.setData({
              chooseImages: [],
              fileIDs:[]
            })
            wx.showToast({
              title: "一张及以上照片上传失败，请重试",
              icon: 'none',
            });
          }})
        }));}
        
        Promise.all(promiseArr).then(res => {//等数组都做完后做then方法
          if (isSuccess == true) {
            let shortM="";
            if(_this.data.textarea_content.length < 20){
              shortM = _this.data.textarea_content.trim();
            } else {
              shortM = _this.data.textarea_content.trim().substring(0,20) + "...";
            }
            let dateArr = this.getNowDate();
            db.collection("feedback").add({
              data:{
                topic: _this.data.topic_content,
                title: _this.data.title.trim(),
                message: _this.data.textarea_content.trim(),
                shortMes: shortM,
                imgs: _this.data.fileIDs,
                date: dateArr,
                status: 0,
                nickName: app.globalData.nickName,
                icon: app.globalData.icon
              },
              success: res=>{
                wx.hideLoading();
                wx.showToast({
                  title: "上传成功！",
                  icon:"success",
                  duration:2000
                });
                _this.setData({
                  chooseImages:[],
                  currentTopicIndex: -1,
                  textarea_content: "",
                  topic_content: "",
                  fileIDs:[],
                  shortMes:"",
                  title:""
                })
              }, 
              fail: console.error
            })
          }
         })
        }
      },
})