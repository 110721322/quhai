// pages/mine/address/address.js
import {
  InitPersonAddress,
} from '../../../apis/quhaiApis';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: [],
  },
  
  toAdd(e){
    console.log(e.currentTarget.dataset.item)
    let url, item;
    if(e.currentTarget.dataset.item){
      item = JSON.stringify(e.currentTarget.dataset.item)
      url = `../addAddress/addAddress?item=${item}`
    }else{
      url = `../addAddress/addAddress`
    }
    wx.navigateTo({
      url: url,
    })
  },
  InitPersonAddress(){
    let that = this;
    let id = wx.getStorageSync('id');
    InitPersonAddress(id, res => {
      that.setData({
        orderList: res.data.data
      })
    }, res => {
      
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    this.InitPersonAddress()
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