// pages/mine/order/order.js
import {
  OrderList,
  OrderConfirm,
} from '../../../apis/quhaiApis';
import {
  showLoading,
  showToast,
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'tab1',
    current_scroll: 'tab1'
  },

  sure(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '是否确认收货（消费）？确认后无法进行退款操作！',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '加载中...',
          })
          that.OrderConfirm(id)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  copy(){
    wx.showModal({
      title: '提示',
      content: '退款请添加客服微信：qlgh2020\n或联系客服电话：13372578932',
      showCancel: false,
      success (res) {
        if (res.confirm) {
          wx.setClipboardData({
            data: 'vx123456',
            success (res) {
              
            }
          })
        } else if (res.cancel) {
          
        }
      }
    })
    
    
  },
  handleChange ({ detail }) {
      
      let num;
      this.setData({
          current: detail.key
      });
      if(detail.key ==='tab2'){
        num = 1
      }else{
        num = 0
      }
  
    this.OrderList(num)
  },

  handleChangeScroll ({ detail }) {
      this.setData({
          current_scroll: detail.key
      });
  },
  OrderList(num){
    let that = this;
    let userid = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.LWT_UserId = userid;
    dataObj.LWT_IsConfirm = num;
    OrderList(JSON.stringify(dataObj), res => {
      that.setData({
        list: res.data.data
      })
    }, res => {
      
    })
  },
  OrderConfirm(id){
    let that = this;
    let dataObj = {};
    dataObj.LWT_TradeId = id;
    dataObj.LWT_IsConfirm = 1;
  
    OrderConfirm(JSON.stringify(dataObj), res => {
      wx.hideLoading()
      showToast({
        title: "已确认收货"
      })
      that.onLoad()
    }, res => {
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let islogin = wx.getStorageSync('islogin');
    if(islogin){
      that.setData({
        islogin: islogin
      })
      that.OrderList(0)
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