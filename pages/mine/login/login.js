// pages/mine/login/login.js
import {
  UserPhone,
  SaveUserInfo,
  UserInfoByID,
  UserVIP,
} from '../../../apis/quhaiApis';
import {
  showToast
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    telhide: true,
    userhide: false
  },
  getMemberInfo(id) {
    let that = this;
   
    UserVIP(id, res => {
      
      let cardList = res.data;
      let isMember;
      
      if(cardList.info === "暂未购买过平台店铺会员"){
        isMember = false;
      }else{
        isMember = true;
      }
      wx.setStorage({
        key: 'isMember',
        data: isMember,
      })
      wx.setStorage({
        key: 'islogin',
        data: true,
      })

      wx.switchTab({
        url: '../mine/mine'
      })
    }, err => {
        
      let cardList = err.data;
      let isMember;
      if(cardList.info === "暂未购买过平台店铺会员" || cardList.info === "管理员已删除会员卡，请重新购买"){
        isMember = false;
      }else{
        isMember = true;
      }
      wx.setStorage({
        key: 'isMember',
        data: isMember,
      })
      wx.setStorage({
        key: 'islogin',
        data: true,
      })

      wx.switchTab({
        url: '../mine/mine'
      })
      // wx.navigateBack()
      
      })
  },
  saveUserInfo(){
    let that = this;
    let scene = wx.getStorageSync('scene');
    let param = {};
    param.LWU_OpenId = that.data.phoneData.openid;
    param.LWU_Phone = that.data.phoneData.telphone;
    param.LWU_Nickname = that.data.userInfo.nickName;
    param.LWU_Sex = that.data.userInfo.gender;
    param.LWU_City = that.data.userInfo.city;
    param.LWU_Province = that.data.userInfo.province;
    param.LWU_Country = that.data.userInfo.country;
    param.LWU_HeadUrl = that.data.userInfo.avatarUrl;
    param.LWU_InviterId = scene;
    console.log('param----------', param);
    wx.setStorage({
      key: 'phone',
      data: that.data.phoneData.telphone,
    })
    wx.setStorage({
      key: 'openid',
      data: that.data.phoneData.openid,
    })
    SaveUserInfo(JSON.stringify(param), res => {
      that.UserInfoByID()
      
    }, res => {

    })
    
  },
  UserInfoByID(){
    let that = this;
    UserInfoByID(that.data.phoneData.openid, res => {
      let id = res.data.data.LWU_ID;
      wx.setStorage({
        key: 'id',
        data: id,
      })
      that.getMemberInfo(id);
      
    }, res => {

    })
  },
  getUserInfo() {
    let that = this;
    wx.getUserInfo({
      success: res => {
        console.log(res.userInfo)
        that.setData({
          userInfo: res.userInfo,
          telhide: false,
          userhide: true
        })
        wx.setStorage({
          key: 'userInfo',
          data: res.userInfo
        })
      }
    })
    
  },
  getPhoneNumber(e) {
    let that = this;
    if (that.data.code) {
      let dataObj = {};
      dataObj.jscode = that.data.code; 
      dataObj.encryptedData = e.detail.encryptedData; 
      dataObj.iv = e.detail.iv;
      console.log(dataObj)
      console.log(dataObj.encryptedData)
      UserPhone(JSON.stringify(dataObj), res => {
         that.setData({
                phoneData: res.data.data
              })
          that.saveUserInfo();
      }, res => {
        showToast({
              title: '登录失败！' + err.data.info
            });
      })
     
    } else {
      showToast({
        title: '登录失败！' + res.errMsg
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.login({
      success(res) {
        that.setData({
          code: res.code
        })
      }
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