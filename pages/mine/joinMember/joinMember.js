// pages/mine/joinMember/joinMember.js
let WxParse = require('../../../lib/wxParse/wxParse.js');
import {
  InitPlaceCard,
  PayMent,
  VerifyDistributor,
} from '../../../apis/quhaiApis';
import {
  showToast,
  showLoading
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCur: -1,
  },
  tabSelect(e) {
  
    if(e.currentTarget.dataset.id === this.data.cardId){
      this.setData({
        tabCur: -1,
        cardId: ''
      })
    }else{
      this.setData({
        tabCur: e.currentTarget.dataset.id,
        cardId: e.currentTarget.dataset.id
      })
    }
    
  },
  getCardList(spaceId) {
    let that = this;
    let dataObj = {};
    let quanyi;
    let userid = wx.getStorageSync('id')
    dataObj.storeid = spaceId || '';
    dataObj.userid = userid;
    InitPlaceCard(JSON.stringify(dataObj), res => {
      let cardList = res.data.data;
      
      if(cardList[0].vippower){
        var article = cardList[0].vippower;
        quanyi = article.split(' ');
      }
      
      that.setData({
        cardList: cardList,
        quanyi: quanyi
      })
      
      WxParse.wxParse('article', 'html', article, that, 5); 
    }, res => {
      showToast({
        title: res.data.info
      });
    })
  },
  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  VerifyDistributor(){
    let that = this;
    let id = wx.getStorageSync('id');
    VerifyDistributor(id, res => {
      if(res.data){ 
        that.setData({
          LWU_IsDistributor: res.data.data.isDistributor
        })
      }
    }, err => {
     
    })
  },
  pay(){
    let that = this;
    wx.showLoading({
      title: '支付中...',
    })
    let id = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.LWT_UserId = id;
    dataObj.LWT_ProductType = 1;
    dataObj.LWT_Number = 1;
    dataObj.LWT_ProductId = that.data.cardId;
    PayMent(JSON.stringify(dataObj), res => {
      wx.requestPayment({
        timeStamp: res.data.data.timeStamp,
        nonceStr: res.data.data.NonceStr,
        package: res.data.data.Package,
        signType: res.data.data.signType,
        paySign: res.data.data.paySign,
        success(re) {
          wx.showToast({
            title: '支付成功',
            icon: 'success',
            duration: 2000
          })
          wx.hideLoading();
          wx.redirectTo({
            url: '../member/member',
          })
        },
        fail(fails) {
          wx.hideLoading();
          showToast({
            title: fails
          });
        }
      })
    }, res => {
      if(res.data.code === 400){
        showToast({
          title: res.data.info
        });
      }else{
        showToast({
          title: res.data.info
        });
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.VerifyDistributor();
    let userInfo = wx.getStorageSync('userInfo');
      let phone = wx.getStorageSync('phone');
      that.setData({
        telphone: `${phone.substr(0, 3)}****${phone.substr(7, 11)}`,
        userInfo: userInfo
      })
    let spaceId = options.spaceId;
    if(spaceId){
      that.getCardList(spaceId);
    }else{
      that.getCardList();
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

  }
})