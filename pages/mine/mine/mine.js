// pages/mine/mine/mine.js
import {
  UserInfoByID,
  UserVIP,
  VerifyDistributor,
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
    islogin: false
  },
  getMemberInfo() {
    let that = this;
    let openid = wx.getStorageSync('openid');
    var dataObj = {

    };
    dataObj.fieldid = '';
    dataObj.openid = openid;
    getMemberInfo(JSON.stringify(dataObj), res => {
      let cardList = res.data.data;
      let isMember, cardNum;
      if(cardList.length == 0){
        isMember = false;
      }else{
        isMember = true;
        cardNum = cardList.length;
        that.setData({
          cardNum: cardNum
        })
      }
      wx.setStorage({
        key: 'isMember',
        data: isMember,
      })
    }, res => {

      })
  },
  toPhoto(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        const tempFilePaths = res.tempFilePaths
      }
    })
  },
  login() {
    wx.redirectTo({
      url: '../login/login',
    })
  },
  myMember(){
    wx.navigateTo({
      url: '../member/member',
    })
  },
  toInvolved(){
    if(this.data.islogin){
      wx.navigateTo({
        url: '../Involved/Involved',
      })
    }else{
      showToast({
        title: "请先登陆"
      })
    }
  },
  toAddress(){
    if(this.data.islogin){
      wx.navigateTo({
        url: '../address/address',
      })
    }else{
      showToast({
        title: "请先登陆"
      })
    }
  },
  toOrder(){
    if(this.data.islogin){
      wx.navigateTo({
        url: '../order/order',
      })
    }else{
      showToast({
        title: "请先登陆"
      })
    }
  },
  toService(){
    wx.navigateTo({
      url: '../customer/customer',
    })
  },
  toAbout() {
    wx.navigateTo({
      url: '../about/about',
    })
  },
  joinMember() {
    wx.navigateTo({
      url: '../joinMember/joinMember',
    })
  },
  tofx(){
    let that = this;
    let url;
    let id = wx.getStorageSync('id');
    wx.showLoading({
      title: '数据加载中...',
    })
    VerifyDistributor(id, res => {
      
      if(res.data){
        console.log(res.data)
        if(res.data.data.isDistributor){
          url = '../minefx/minefx'
        }else{
          url = '../joinfx/joinfx'
        }
        wx.navigateTo({
          url: url,
          // url: '../joinfx/joinfx',
        })
      }
      wx.hideLoading()
    }, err => {
      wx.hideLoading()
    })
    
  },
  UserInfoByID(){
    let that = this;
    let openid = wx.getStorageSync('openid');
    UserInfoByID(openid, res => {
      let data = res.data.data, isMember;
      if(data.LWU_IsVIP === 1){
        isMember = true
      }else{
        isMember = false
      }
      wx.setStorageSync('LWU_IsDistributor', data.LWU_IsDistributor) 
      that.setData({
        LWU_IsDistributor: data.LWU_IsDistributor,
        isMember: isMember
      })
      
    }, err => {
      wx.hideLoading()
    })
  },
  UserVIP(){
    let that = this;
    let id = wx.getStorageSync('id');
    UserVIP(id, res => {
      let data = res.data.data;
      that.setData({
        cardNum: data.length
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
    let islogin = wx.getStorageSync('islogin');
    let isMember = wx.getStorageSync('isMember');
    if (islogin){
      that.setData({
        islogin: islogin,
        isMember: isMember
      })
      let userInfo = wx.getStorageSync('userInfo');
      let phone = wx.getStorageSync('phone');
      that.setData({
        telphone: `${phone.substr(0, 3)}****${phone.substr(7, 11)}`,
        userInfo: userInfo
      })
      wx.showLoading({
        title: '数据加载中...',
      })
      that.UserInfoByID();
      that.UserVIP()
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
    this.onLoad()
    wx.stopPullDownRefresh()
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