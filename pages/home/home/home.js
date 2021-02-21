// pages/home/home/home.js
let QQMapWX = require('../../../utils/qqMapSdk.js');
const stringUtils = require("../../../utils/stringUtils.js");
import {
  showLoading,
  showToast,
  converDistance,
} from '../../../utils/common';
import {
  getSpace,
  getSpaceScheduleInfo,
  getUserInfoByOpenID,
  orderInsert,
  getMemberInfo,
} from '../../../apis/quhaiApis';
import {
  InitBanner,
  InitPlaceType,
  InitPlace,
} from '../../../apis/quhaiApis';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabData: [],
    weekData: [],
    dayData: [],
    timeData: [],
    tabCur: 0,
    tabCur2: -1,
    scrollLeft: 0,
    today: 0,
    today2: 0,
    verticalNavTop: 0,
    showDate: true,
    tabShow: false,
    dateShow: false,
    tipShow: true,
    successShow: true,
    spaceList: [],
    date: '今天',
    name: 'name1',
    hideType: true
  },
  showType(){
    this.setData({
      hideType: false,
      dateShow: true
    })
  },
  showTypen(){
    this.setData({
      hideType: true,
      dateShow: false
    })
  },
//触发表单提交事件，调用接口
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
  tabSelect(e) {
    let that = this;
    console.log(e);
    this.setData({
      tabCur: e.currentTarget.dataset.index,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60
    })
    let typeId = e.currentTarget.dataset.id;
  
    
      let dataObj = {};
      dataObj.lng = that.data.longitude; 
      dataObj.lat = that.data.latitude; 
      dataObj.type = typeId;
      that.InitPlace(JSON.stringify(dataObj)) 
  },
  tabSelect2(e) {
    this.setData({
      tabCur2: e.currentTarget.dataset.index,
      timeId: e.currentTarget.dataset.id,
      timeVal: e.currentTarget.dataset.time,
      verticalNavTop: (e.currentTarget.dataset.index - 1) * 50
    })
  },
  tabSelect4(e) {
    let that = this;
    that.setData({
      today2: e.currentTarget.dataset.index,
      tabCur2: -1
    })
    var dataObj = {
    
    };
    var date = that.GetDateStr(that.data.today2);
    dataObj.F_DepartmentId = that.data.spaceId;
    dataObj.F_Date = date;
    wx.showLoading({
      title: '数据加载中...',
    })
    that.getSpaceScheduleInfo(JSON.stringify(dataObj));
  },
  submit(){
    if (this.data.tabCur2 >= 0){
      this.setData({
        tipShow: false,
        showDate: true,
        tabShow: true
      })
    }else{
      showToast({
        title: "请选择时间"
      })
    }
  },
  tipCancel(){
    this.showHidden();
    this.hideDate();
    this.setData({
      dateShow: false,
      today2: 0
    })
  },
  tipSure() {
    let that = this;
    this.showHidden();
    this.hideDate();
    this.setData({
      dateShow: false,
      today2: 0
    })
    var dataObj = {

    };
    let openid = wx.getStorageSync('openid');
    dataObj.F_UserId = openid;
    dataObj.F_ScheduleId = that.data.timeId;
    dataObj.F_FieldId = that.data.spaceId;
    orderInsert(JSON.stringify(dataObj),res => {
      that.setData({
        successShow: false,    
      })
      setTimeout(function () {
        that.setData({
          successShow: true,
          
        })
        var successFlag = true;
        wx.switchTab({
          url: `/pages/reservation/reservation/reservation?successFlag=${successFlag}`
        })
      }, 2500)
    }, res => {
      showToast({
        title: res.data.info
      })
    })
    
    
  },
  toShop(e){
    let spaceId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../shop/shop?spaceId=${spaceId}`,
    })
  },
  showDate(e){
    let that = this;
    let isMember = wx.getStorageSync('isMember');
    let islogin = wx.getStorageSync('islogin');
    if(!islogin){
      wx.reLaunch({
        url: '../../mine/login/login',
      })
      return false;
    }
    
    let openid = wx.getStorageSync('openid');
    let spaceId = e.currentTarget.dataset.id;
    var dataObj = {

    };
    dataObj.fieldid = spaceId;
    dataObj.openid = openid;
    getMemberInfo(JSON.stringify(dataObj), res => {
      let cardList = res.data.data;
      
      if(cardList.length == 0){
        isMember = false;
        wx.navigateTo({
              url: `../../mine/joinMember/joinMember?spaceId=${spaceId}`,
            })
      }else{
        
        var dataObj2 = {
        };
        var date = new Date();
        var date1 = date.toLocaleDateString();
        dataObj2.F_DepartmentId = spaceId;
        dataObj2.F_Date = date1;
        wx.showLoading({
          title: '数据加载中...',
        })
        that.setData({
                  showDate: false,
                  dateShow: true,
                  spaceId: spaceId,
                  tipName: e.currentTarget.dataset.name
                })
        that.getSpaceScheduleInfo(JSON.stringify(dataObj2));
              
            
      }
      wx.setStorage({
        key: 'isMember',
        data: isMember,
      })
    }, res => {

      })

  },
  hideDate(){
    this.setData({
      showDate: true
    })
  },
  closeDate(){
    this.setData({
      showDate: true,
      dateShow: false,
      today2: 0
    })
    this.showTypen()
  },
  showHidden() {
    this.setData({
      tabShow: false,
      tipShow: true
    })
  },
  showCityList() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  dealWeekData(){
    var weekData = [];
    var date = new Date();
    var time1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    
    var date2 = new Date(date);
     date2.setDate(date.getDate() + 6);
    var time2 = date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate(); 
    
   
    var day = new Array("日", "一", "二", "三", "四", "五", "六")[date.getDay()];
    date.setDate(date.getDate());
    var dateArray = [];
    var monthArray = [];
    var dateTemp, monthTemp;
    var flag = 1;
    for (var i = 0; i < 7; i++) {
      dateTemp = date.getDate();
      dateArray.push(dateTemp);
      date.setDate(date.getDate() + flag);
    }
    for (var i = 0; i < 7; i++) {
      monthTemp = date.getMonth()+ 1;
      monthArray.push(monthTemp);
      date.setDate(date.getMonth() + flag);
    }
    let dateArray2 = dateArray;
    let replace = dateArray.splice(0,1,"今");
    switch (day) {
      case '日':
        weekData = ['今日', '一', '二', '三', '四', '五','六'];
        break;
      case '一':
        weekData = ['今日', '二', '三', '四', '五', '六', '日'];
        break;
      case '二':
        weekData = ['今日', '三', '四', '五', '六', '日', '一'];
        break;
      case '三':
        weekData = ['今日', '四', '五', '六', '日', '一', '二'];
        break;
      case '四':
        weekData = ['今日', '五','六', '日', '一', '二', '三'];
        break;
      case '五':
        weekData = ['今日', '六', '日', '一', '二', '三', '四'];
        break;
      case '六':
        weekData = ['今日', '日', '一', '二', '三', '四','五'];
        break;
    }
    
    this.setData({
      weekData: weekData,
      dayData: dateArray,
      dayData2: dateArray2,
      monthArray: monthArray
    })
  },
  GetDateStr(AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;//获取当前月份的日期
    var d = dd.getDate();
    return y+"-"+m+"-"+d;
    },
  shopNavigation(e) {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    })
    that.formSubmit(e.currentTarget.dataset.address)
  },
  toGuide() {
    wx.navigateTo({
      url: '../guide/guideIndex',
    })
  },
  
  bindDateChange: function(e) {
    let that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let selDate = e.detail.value;
    selDate = selDate.substr(5, 5);
    this.setData({
      date: selDate
    })
    var dataObj = {};
    var date = new Date();
    dataObj.F_DepartmentId = that.data.spaceId;
    dataObj.F_Date = e.detail.value;
    that.getSpaceScheduleInfo(JSON.stringify(dataObj));
  },
  getlocation(){
    let that = this;
    
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res);
        const latitude = res.latitude
        const longitude = res.longitude
        
        that.setData({
          latitude: latitude,
          longitude: longitude
        })
        that.getLocal(latitude, longitude);
      },
      fail(ret) {
        console.log(ret);
      }
    })
  },
  getLocal: function (lat, lng) {
    let that = this;
    wx.showLoading({
      title: '数据加载中...',
    })
    QQMapWX.reverseGeocoder({
      location: {
        latitude: lat,
        longitude: lng
      },
      success: function (res) {
        console.log(res)
        let city = res.result.address_component.city+'-'+res.result.address_component.district;
        that.setData({
          location: stringUtils.isBlank(city) ? "杭州市" : city,
          latitude: lat,
          longitude: lng
        })
        that.InitPlaceType();
      },
      fail: function (res) {
        wx.hideLoading()
      }
    })
  },
  
  getBanner() {
    let that = this;
    InitBanner(res => {
      let swiperItem = res.data.data;
      that.setData({
        swiperItem: swiperItem
      })
      console.log(that.data.swiperItem);
    }, res => {

    })
  },
  InitPlaceType() {
    let that = this;
    InitPlaceType(res => {
      that.setData({
        tabData: res.data.data
      })
      let dataObj = {};
      dataObj.lng = that.data.longitude; 
      dataObj.lat = that.data.latitude; 
      dataObj.type = res.data.data[0].id;
      that.InitPlace(JSON.stringify(dataObj)) 
    }, err => {
      wx.hideLoading()
    })
  },
  InitPlace(dataObj) {
    let that = this;
    InitPlace(dataObj, res => {
      let spaceList = res.data.data;
      
      for (let i in spaceList) {
        let distanceS = spaceList[i].distance;
        spaceList[i].distanceS = converDistance(distanceS);
      }
    
      that.setData({
        spaceList: spaceList
      })
      wx.hideLoading()
    }, err => {
      wx.hideLoading()
    })
  },
  getSpace(dataObj) {
    let that = this;
    getSpace(dataObj, res => {
      wx.hideLoading();
      let spaceList = res.data.data;
      for (let i in spaceList) {
        let distance = spaceList[i].F_Distance;
        spaceList[i].distance = converDistance(distance);
      }
    
      that.setData({
        spaceList: spaceList
      })
    }, res => {
      wx.hideLoading();
    })
  },
  getSpaceScheduleInfo(spaceId) {
    let that = this;
    getSpaceScheduleInfo(spaceId,res => {
      wx.hideLoading();
      console.log(res.data.data);
      let spaceDateList = res.data.data;
      that.setData({
        spaceDateList: spaceDateList
      })
    }, res => {
      wx.hideLoading();
    })
  },
  getUserInfoByOpenID(openid) {
    console.log(openid);
    getUserInfoByOpenID(openid, res => {

    }, res => {

    })
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
      let isMember, memberInfo;
      if(cardList.length == 0){
        isMember = false;
      }else{
        isMember = true;
        memberInfo = res.data.data;
        that.setData({
          memberInfo: memberInfo
        })
      }
      wx.setStorage({
        key: 'isMember',
        data: isMember,
      })
    }, res => {

      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    console.log('options---------------', options)
    if(options.scene){
      wx.setStorageSync('scene', options.scene)
    }
    that.dealWeekData();
    that.getlocation();
    that.getBanner();
    
    wx.login({
      success(res) {
        if (res.code) {
          
          //发起网络请求
          // wx.request({
          //   url: 'https://qh.9n19.com/Applet/OpenID?data='+res.code,
          //   method: 'get',
          //   success(data) {
          //     console.log(data.data);
             
          //   },
          //   fail(err) {

          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
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
    console.log('show');
    this.setData({
      tabCur: 0
    })
    // this.InitPlaceType();
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
    let that = this;
    this.setData({
      scrollLeft: 0,
      tabCur: 0
    })
    that.dealWeekData();
    that.getlocation();
    that.getBanner();
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