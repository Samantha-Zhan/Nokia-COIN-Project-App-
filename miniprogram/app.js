//app.js
App({
  globalData:{
    statusLst:["hello", "you"],
    topicLst:[],
    statusObj:{},
    admin_passcode:"",
    superadmin_passcode:"",
    isAdmin: false,
    isSuperAdmin: false,
    nickName: "未知",
    icon:"cloud://nanyanfb-8g1led9mcc2b037d.6e61-nanyanfb-8g1led9mcc2b037d-1301503242/user-unlogin.png"
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'nanyanfb-8g1led9mcc2b037d',
        traceUser: true,
      })
    }
    
   },
   setUp: function(){
    const db = wx.cloud.database();
    return new Promise((resolve, reject) => {
      db.collection("configInfo").get().then(r=>{
        this.globalData.statusLst = r.data[0].statusLst;
        this.globalData.topicLst = r.data[0].type;
        this.globalData.statusObj = r.data[0].statusObj;
        this.globalData.admin_passcode = r.data[0].admin_passcode;
        this.globalData.superadmin_passcode = r.data[0].superadmin_passcode;
        resolve();
      })})
   },
   //渐入，渐出实现 
  show : function(that,param,opacity){
    var animation = wx.createAnimation({
      //持续时间800ms
      duration: 800,
      timingFunction: 'ease',
    });
    //var animation = this.animation
    animation.opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //滑动渐入渐出
  slideupshow:function(that,param,px,opacity){
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateY(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  },

  //向右滑动渐入渐出
  sliderightshow: function (that, param, px, opacity) {
    var animation = wx.createAnimation({
      duration: 800,
      timingFunction: 'ease',
    });
    animation.translateX(px).opacity(opacity).step()
    //将param转换为key
    var json = '{"' + param + '":""}'
    json = JSON.parse(json);
    json[param] = animation.export()
    //设置动画
    that.setData(json)
  }
})
