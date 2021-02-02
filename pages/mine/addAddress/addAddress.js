// pages/mine/addAddress/addAddress.js
import {
  ManagePersonAddress,
} from '../../../apis/quhaiApis';
import {
  showToast,
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['选择省', '选择市', '选择区'],
    switch1 : false,
    noValue: true,
    name: '',
    tel: '',
    detail: '',
  },
  onChange(event){
      const detail = event.detail;
      let LWA_IsDefault;
      if(detail.value){
        LWA_IsDefault = 1
      }else{
        LWA_IsDefault = 0
      }
      this.setData({
          switch1 : detail.value,
          LWA_IsDefault : LWA_IsDefault
      })
      
  },
  delAddress(){
   
    let that = this;
    let id = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.LWA_ID = that.data.id;
    dataObj.LWA_DeleteMark = 1;
    ManagePersonAddress(JSON.stringify(dataObj), res => {
      wx.showToast({
        title: '地址删除成功',
        icon: 'none'
      })
      wx.navigateBack({
        delta: 1
      })
    }, res => {
      
    })
  },
  bindRegionChange: function (e) {
  
    this.setData({
      region: e.detail.value
    })
    this.setValue();
  },
  getName(e){
    this.setData({
      name: e.detail.detail.value
    })
    this.setValue();
  },
  getTel(e){
    this.setData({
      tel: e.detail.detail.value
    })
    this.setValue();
  },
  getAddress(e){
    this.setData({
      detail: e.detail.detail.value
    })
    this.setValue();
  },
  setValue(){
    let that = this, value;
    if(that.data.name != '' && that.data.tel != '' && that.data.detail != '' && that.data.region[0] != '选择省' && that.data.region[1] != '选择市' && that.data.region[2] != '选择区'){
      value = false;
    }else{
      value = true
    }
    console.log('set')
    that.setData({
      noValue: value
    })
    console.log(this.data.noValue)
  },
  ManagePersonAddress(){
    let that = this;
    let id = wx.getStorageSync('id');
    let dataObj = {}
    dataObj.LWA_UserId = id;
    dataObj.LWA_Name = that.data.name;
    dataObj.LWA_Phone = that.data.tel;
    dataObj.LWA_Province = that.data.region[0];
    dataObj.LWA_City = that.data.region[1];
    dataObj.LWA_Area = that.data.region[2];
    dataObj.LWA_Address = that.data.detail;
    dataObj.LWA_IsDefault = that.data.LWA_IsDefault;
    if(that.data.id){
      dataObj.LWA_ID = that.data.id;
    }
    ManagePersonAddress(JSON.stringify(dataObj), res => {
      showToast({
        title: "保存成功"
      })
      wx.navigateBack({
        delta: 1
      })
    }, res => {
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.item){
      console.log(JSON.parse(options.item))
      let item = JSON.parse(options.item);
      let arr = [];
      arr.push(item.province)
      arr.push(item.city)
      arr.push(item.area)
      this.setData({
        editInfo: item,
        name: item.name,
        tel: item.phone,
        detail: item.address,
        region: arr,
        id: item.id,
        noValue: false,
        isAdd: false
      })
    }else{
      this.setData({
        isAdd: true
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})