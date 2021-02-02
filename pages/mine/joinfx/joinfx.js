// pages/mine/joinfx/joinfx.js
import {
  ApplyDistributor,
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
  joinfx(){
    let that = this;
    let id = wx.getStorageSync('id');
    ApplyDistributor(id, res => {
      wx.showModal({
        title: '提示',
        content: '提交成功，客服稍后会与您联系',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }, res => {
      showToast({
        title: res.data.info
      })
    })
    
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: (res) => {
        console.log(res)
        this.setData({
          windowH: res.windowHeight
        })
      },
    })
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