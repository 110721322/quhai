// pages/reservation/reservation/reservation.js
let QQMapWX = require('../../../utils/qqMapSdk.js');
const { $Toast } = require('../../../dist/base/index');
import {
  InitOrderList,
  CancelOrder,
  ArriveConfirm
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
    tabShow: false,
    tipShow: true,
    islogin: false,
    visible2: false,
    cancel: false
  },
  handleClose2 () {
    this.setData({
        visible2: false
    });
},
  getlocation(){
    let that = this;
    
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
      },
      fail(ret) {
        console.log(ret);
      }
    })
  },
  ArriveConfirm(e){
    let that = this;
    // wx.showLoading({
    //   title: '加载中...',
    //   mask: true
    // })
    let fencedistance = parseInt(e.currentTarget.dataset.fencedistance) ;
    QQMapWX.geocoder({
      address:e.currentTarget.dataset.address, 
      success: function(res) {
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        let distance = that.getDistance(latitude, longitude, that.data.latitude, that.data.longitude);
        if(distance <= fencedistance){
          let dataObj =  e.currentTarget.dataset.id;
          ArriveConfirm(dataObj, res => {
            // wx.showToast({
            //   title: '确认成功'
            // })
            $Toast({
              content: '确认成功'
          });
            that.getOrderList();
          },err=>{
            
            showToast({
              title: err.data.info,
              icon: 'none'
            })
          })  
        }else{
          // wx.showToast({
          //   title: '未进入签到范围',
          //   icon: 'none'
          // })
        //   that.setData({
        //     visible2: true
        // });
          $Toast({
            content: '未进入签到范围'
        });
        }
      },
      fail: function(error) {
        console.error(error);
        $Toast({
          content: error.message
      });
      },
      complete: function(res) {
        console.log(res);
      }
    })
    
  },
  formSubmit(address) {
    var _this = this;
    //调用地址解析接口lng: 120.26018, lat: 30.19876
    QQMapWX.geocoder({
      //获取表单传入地址
      address: address, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function(res) {//成功后的回调
        console.log(res);
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        _this.setData({
          shoplat:latitude,
          shoplng: longitude
        });
        
        wx.openLocation({//​使用微信内置地图查看位置。
          longitude:_this.data.shoplng,//要去的纬度-地址
          latitude: _this.data.shoplat,//要去的经度-地址
          complete(res) {
            wx.hideLoading();
          }
        })
      },
      fail: function(error) {
        console.error(error);
      },
      complete: function(res) {
        console.log(res);
      }
    })
  },
  shopNavigation(e) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    that.formSubmit(e.currentTarget.dataset.address)
    
  },
  cancelOrder(e){
    this.setData({
      tabShow: true,
      tipShow: false,
      orderId: e.currentTarget.dataset.id,
    
    })
  },
  tipCancel(){
    this.hideTip();
  },
  tipSure() {
    let that = this;
    let orderId = that.data.orderId;
    let dataObj = {};
    dataObj.data = orderId;
    
    CancelOrder(orderId, res => {
      that.hideTip();
      that.getOrderList();
    }, res => {

    })
  },
  hideTip(){
    this.setData({
      tabShow: false,
      tipShow: true
    })
  },
  getOrderList() {
    let that = this;
    var dataObj = {};
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let id = wx.getStorageSync('id');
    dataObj.handle = '101';
    dataObj.userid = id;

    InitOrderList(JSON.stringify(dataObj), res => {
      let orderList = res.data.data;
      for(let i in orderList){
        orderList[i].start = orderList[i].starttime.substring(10, 16);
        orderList[i].date = orderList[i].starttime.substring(0, 10);
        orderList[i].end = orderList[i].endtime.substring(10, 16);
      }
      that.setData({
        orderList: orderList
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
    that.getlocation()
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
    let that = this;
    let islogin = wx.getStorageSync('islogin');
    if(islogin){
      that.setData({
        islogin: islogin
      })
      that.getOrderList();
    }
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
  getDistance(latFrom, lngFrom, latTo, lngTo) {
    var radLatFrom = this.rad(latFrom);
      var radLatTo = this.rad(latTo);
      var a = radLatFrom - radLatTo;
      var b = this.rad(lngFrom) - this.rad(lngTo);
      var distance = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLatFrom) * Math.cos(radLatTo) * Math.pow(Math.sin(b / 2), 2)));
      distance = distance * 6378136.49;
      distance = Math.round(distance * 10000) / 10000;
      return parseFloat(distance.toFixed(0));
  },
  rad(d) {
    return d * Math.PI / 180.0;
  }, 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})