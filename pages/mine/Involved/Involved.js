// pages/mine/Involved/Involved.js
import {
  InitOrderList,
} from '../../../apis/quhaiApis';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList: []
  },
  getOrderList() {
    let that = this;
    var dataObj = {

    };
    let id = wx.getStorageSync('id');
    dataObj.handle = '100';
    dataObj.userid = id;

    InitOrderList(JSON.stringify(dataObj), res => {
      let orderList = res.data.data;
      for(let i in orderList){
        orderList[i].start = orderList[i].starttime.substring(10, 16);
        orderList[i].end = orderList[i].endtime.substring(10, 16);
        orderList[i].date = orderList[i].starttime.substring(0, 10);
      }
      that.setData({
        orderList: orderList
      })
    }, res => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.getOrderList();
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