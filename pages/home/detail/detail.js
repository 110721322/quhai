// pages/home/detail/detail.js
import {
  InitPlaceCard,
  PayMent,
  InitDiscountCommodity
} from '../../../apis/quhaiApis';
import {
  showToast,
  showLoading
} from '../../../utils/common';
let WxParse = require('../../../lib/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItem: ['../../../image/membert.jpg'],
    value1: 1
  },
  handleChange1 ({ detail }) {
    this.setData({
        value1: detail.value
    })
  },

  handleChange2 ({ detail }) {
      this.setData({
          value2: detail.value
      })
  },
  InitDiscountCommodity(id){
    let that = this;
    InitDiscountCommodity(id, res => {
      that.setData({
        goodsInfo: res.data.data
      })
      var article = res.data.data.introduce;
      WxParse.wxParse('article', 'html', article, that, 5); 
    }, res => {
      
    })
  },
  payMent(){
    let that = this;
    wx.showLoading({
      title: '支付中...',
    })
    let id = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.LWT_UserId = id;
    dataObj.LWT_ProductType = 2;
    dataObj.LWT_Number = that.data.value1;
    dataObj.LWT_ProductId = that.data.goodsInfo.id;
    
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
          // that.PaySuccess(res.data.data.orderId);
        },
        fail(fails) {
          wx.hideLoading();
          showToast({
            title: fails
          });
        }
      })
    }, res => {
      showToast({
        title: res.data.info
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.InitDiscountCommodity(options.id)
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})