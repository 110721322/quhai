// pages/mall/mall/mall.js
import {
  InitPaltformCommodityType,
  InitPaltformCommodity,
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
    tabData: [{name: '推荐'}, {name: '零食'},{name: '生活用品'},{name: '农产品'}],
    tabCur: 0,
  },
  tabSelect(e) {
    let that = this;
    this.setData({
      tabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60
    })
    let typeId = e.currentTarget.dataset.id;
    that.InitPaltformCommodity(typeId) 
  },
  toDetail(e){
    let goodsId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:  `../goods/goods?goodsId=${goodsId}`,
    })
  },
  InitPaltformCommodityType() {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    InitPaltformCommodityType(res => {
      that.setData({
        tabData: res.data.data
      })
      let id = res.data.data[0].id;
      that.InitPaltformCommodity(id) 
    }, err => {
      wx.hideLoading()
    })
  },
  InitPaltformCommodity(id){
    let that = this;
    InitPaltformCommodity(id, res => {
      that.setData({
        list: res.data.data
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
    let LWU_IsDistributor = wx.getStorageSync('LWU_IsDistributor')
    that.setData({
      LWU_IsDistributor: LWU_IsDistributor
    })
    that.InitPaltformCommodityType();
    
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
    // this.setData({
    //   tabCur: 0
    // })
    // this.onLoad()
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