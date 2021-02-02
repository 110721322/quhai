// pages/mine/fxDetail/fxDetail.js
import {
  PersonRebate,
} from '../../../apis/quhaiApis';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  PersonRebate(){
    let that = this;
    let dataObj = {};
    let page = {"rows":100,"page":1};
    let id = wx.getStorageSync('id');
    dataObj.page = page;
    dataObj.userid = id;
    PersonRebate(JSON.stringify(dataObj), res => {
     let list = res.data.data;
     that.setData({
      list: list
     })
    }, res => {
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.PersonRebate();
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