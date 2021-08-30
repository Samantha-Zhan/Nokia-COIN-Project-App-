// components/dropDownSelect.js
Component({
  /**
   * Component properties
   */
  properties: {
    dataLst:{
      type:Array,
      value:["暂无状态"]
    },
    dataObj:{
      type:Object,
      value:{
        "暂无状态":"orange"
      }
    },
    currentIndex:{
      type:Number,
      value:0 
    }
  },

  /**
   * Component initial data
   */
  data: {
    isExpand:false
  },

  /**
   * Component methods
   */
  methods: {
    handleTap(){
      if (this.data.isExpand){
        this.setData({
          isExpand: false
        })
      } else{
        this.setData({
          isExpand: true
        })
      }
    },
    handleChangeTap(e){
      let changeTo = e.target.dataset.index;
      this.triggerEvent("onChangeStatus",changeTo);
      this.setData({
        currentIndex: changeTo,
        isExpand:false
      })
    }
  }
})
