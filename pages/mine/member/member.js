// pages/mine/member/member.js
import {
  UserVIP,
} from '../../../apis/quhaiApis';
import {
  showLoading,
  showToast
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  renew(e) {
    // let cardId = e.currentTarget.dataset.id;
    // let cardTime = e.currentTarget.dataset.time;
    // wx.navigateTo({
    //   url: `../memberRenew/memberRenew?cardId=${cardId}&cardTime=${cardTime}`,
    // })
    let spaceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../../home/shop/shop?spaceId=${spaceId}`,
    })
  },
  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  toShop(e){
    let spaceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../../home/shop/shop?spaceId=${spaceId}`,
    })
  },
  UserVIP(){
    let that = this;
    let id = wx.getStorageSync('id');
    wx.showLoading({
      title: '数据加载中...',
    })
    UserVIP(id, res => {
      let cardList = res.data.data;
      console.log(cardList);
      that.setData({
        cardList: cardList
      })
      wx.hideLoading()
    }, err => {
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let userInfo = wx.getStorageSync('userInfo');
      let phone = wx.getStorageSync('phone');
      that.setData({
        telphone: `${phone.substr(0, 3)}****${phone.substr(7, 11)}`,
        userInfo: userInfo
      })
    that.UserVIP()
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
})