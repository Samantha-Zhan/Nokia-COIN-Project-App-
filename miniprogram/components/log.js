// components/log.js
const app = getApp();
Component({
  /**
   * Component properties
   */
  properties: {
    date:{
      type:String, 
      value:"Unkown"
    },
    log:{
      type:JSON,
      value:""
    }

  },

  /**
   * Component initial data
   */
  data: {
    message:"",
  },
  

  /**
   * Component methods
   */
  methods: {
    clickHandler(){ 
      let _this = this;
      wx.navigateTo({
        url: '/pages/logDetail/logDetail?imgLink='+encodeURIComponent(JSON.stringify(this.data.log.imgs))+
        "&logId="+this.data.log._id+"&type="+this.data.log.topic+"&message="+this.data.log.message+"&nickName="+this.data.log.nickName+"&logo="+this.data.log.icon+"&title="+this.data.log.title+"&date="+this.data.date+"&statusIndex="+this.data.log.status+"&isAdmin="+this.data.log.isAdmin,
        events: {

          //events里的函数是兼听B页面的事件，获取其传过来的数据。events里可以有多个兼听事件
          
          acceptDataFromB: function(data){
        
          console.log(data) //这是从B页面向A页面传输的数据
          _this.setData({
            message: data.text,
          })
          }
        }
      })
    }
  }
})
