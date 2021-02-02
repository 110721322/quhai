// pages/mine/memberRenew/memberRenew.js
import {
  UserCardRenewLog,
  InitPlaceCard,
  PayMent,
} from '../../../apis/quhaiApis';
import {
  showToast
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollLeft: 0,
    tabCur: -1,
    cardList: [],
    orderCard: [],
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      tabCur: e.currentTarget.dataset.index,
      id: e.currentTarget.dataset.id,
      cardMonth: e.currentTarget.dataset.time,
      cardPrice: e.currentTarget.dataset.price,
      // scrollLeft: (e.currentTarget.dataset.index - 1) * 60
    })
  },
  
  onBack() {
    wx.navigateBack({
      delta: 1
    })
  },
  UserCardRenewLog(){
    let that = this;
    let dataObj = {

    };
    let userid = wx.getStorageSync('id');
    dataObj.userid = userid;
    dataObj.storeid = that.data.cardId;
    UserCardRenewLog(JSON.stringify(dataObj), res => {
      let id = res.data.data.cardid;
      that.getCardList(id)
    }, res => {
      })
  },
  getCardList(id) {
    let that = this;
    let userId = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.userid = userId;
    dataObj.storeid = that.data.cardId;
    InitPlaceCard(JSON.stringify(dataObj), res => {
      let cardList = res.data.data[0].cardinfo;
      for(var i in cardList ){
        if(cardList[i].id === id){
          that.setData({
            cardList: cardList,
            storename: res.data.data[0].storename
          })
          // cardDesc: cardList[i].cardDesc
        }else{
          // if(cardList[i].length != 0){
          //   that.setData({
          //     othersCard: cardList[i].cardDetail,
          //     othersName: cardList[i].cardId
          //   })
          // }
          
        }
      }
      
    }, res => {

    })
  },
  PaySuccess(orderId){
    PaySuccess(orderId, res => {
      wx.hideLoading();
      wx.showToast({
        title: '支付成功',
        icon: 'success',
        duration: 2000
      })
      wx.redirectTo({
        url: '../member/member',
      })
    }, res => {
      showToast({
        title: res.data.info
      });
    })
  },
  payNow(e){
    let that = this;
    wx.showLoading({
      title: '支付中...',
    })
    let openid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://qh.9n19.com/Applet/OrderPay',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        "data": JSON.stringify({
          "money": e.currentTarget.dataset.price,
          "openid": openid,
          "desc": that.data.cardDesc,
          "month":e.currentTarget.dataset.time,
          "id": e.currentTarget.dataset.id
        })
      },
      success(ret) {
        console.log(ret.data.data)

        wx.requestPayment({
          timeStamp: ret.data.data.timeStamp,
          nonceStr: ret.data.data.NonceStr,
          package: ret.data.data.Package,
          signType: ret.data.data.signType,
          paySign: ret.data.data.paySign,
          success(re) {
            that.PaySuccess(ret.data.data.orderId);
          },
          fail(fails) {
            wx.hideLoading();
            showToast({
              title: fails
            });
          }
        })
      },
      fail(err) {
        showToast({
          title: err.data.info
        });
      }
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
    dataObj.LWT_ProductId = that.data.id;
    
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
      showToast({
        title: res.data.info
      });
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log(options);
    that.setData({
      cardId: options.cardId,
      cardTime: options.cardTime,
    })
    let userInfo = wx.getStorageSync('userInfo');
      let phone = wx.getStorageSync('phone');
      that.setData({
        telphone: `${phone.substr(0, 3)}****${phone.substr(7, 11)}`,
        userInfo: userInfo
      })
    that.UserCardRenewLog();
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