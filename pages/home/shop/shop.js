// pages/home/shop/shop.js
let QQMapWX = require('../../../utils/qqMapSdk.js');
import {
  showLoading,
  showToast
} from '../../../utils/common';
import {
  InitPlaceDetail,
  InitPlaceWorkTime,
  OrderPlace,
  UserVIP,
  PayMent,
} from '../../../apis/quhaiApis';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItem: ['../../../image/membert.jpg'],
    showDate: true,
    dateShow: false,
    isPay: true,
    today2: 0,
    tabCur2: -1,
    tipShow: true,
    successShow: true,
  },
  formSubmit(address) {
    var _this = this;
    //调用地址解析接口
    QQMapWX.geocoder({
      //获取表单传入地址
      address: address, //地址参数
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
    that.setData({
      today2: e.currentTarget.dataset.index,
      tabCur2: -1
    })
    var dataObj = {
    
    };
    var date = that.GetDateStr(that.data.today2);
    that.setData({
      nowDate: date
    })
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    dataObj.LWT_StoreId = that.data.spaceId;
    dataObj.LWT_DateTime = date;
    that.InitPlaceWorkTime(dataObj)
  },
  tabSelect2(e) {
    if(e.currentTarget.dataset.id === this.data.timeId){
      this.setData({
        tabCur2: -1,
        timeId: ''
      })
    }else{
      this.setData({
        tabCur2: e.currentTarget.dataset.index,
        timeId: e.currentTarget.dataset.id,
        timeVal: e.currentTarget.dataset.time,
        timeVal2: e.currentTarget.dataset.time2,
        timePrice: e.currentTarget.dataset.price,
        verticalNavTop: (e.currentTarget.dataset.index - 1) * 50
      })
    }
    
  },
  submit(){
    if (this.data.tabCur2 >= 0){
      if(this.data.timePrice > 0){
        this.setData({
          isPay: false,
          showDate: true
        })
      }else{
        this.setData({
          tipShow: false,
          showDate: true,
          tabShow: true
        })
      }
      
    }else{
      showToast({
        title: "请选择时间"
      })
    }
  },
  tipCancel(){
    this.showHidden();
    // this.hideDate();
    this.setData({
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
    let openid = wx.getStorageSync('id');
    dataObj.LWO_UserId = openid;
    dataObj.LWO_DemandDate = that.data.nowDate;
    dataObj.LWO_WorkTimeId = that.data.timeId;
    OrderPlace(JSON.stringify(dataObj),res => {
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
      that.setData({
        tabShow: false
      })
      showToast({
        title: res.data.info
      })
    })
    
    
  },
  showHidden() {
    this.setData({
      dateShow: false,
      showDate: true,
      tipShow: true,
      isPay: true
    })
  },
  hideDate(){
    this.setData({
      showDate: true
    })
  },
  toDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../detail/detail?id=${id}`,
    })
  },
  myMember(){
    let that = this;
    let islogin = wx.getStorageSync('islogin');
    if(!islogin){
      wx.reLaunch({
        url: '../../mine/login/login',
      })
      return false;
    }
    wx.navigateTo({
      url: `../../mine/joinMember/joinMember?spaceId=${this.data.spaceId}`,
    })
  },
  callB(){
    showLoading({
      title: "数据加载中..."
    })
    wx.makePhoneCall({
      phoneNumber: this.data.shopInfo.phone,
      success() {
        wx.hideLoading();
      },
      fail() {
        wx.hideLoading();
      }
    })
  },
  payment(){
    let that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    let id = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.LWT_UserId = id;
    dataObj.LWT_ProductType = 4;
    dataObj.LWT_Number = 1;
    dataObj.LWT_ProductId = that.data.timeId;
    dataObj.LWO_DemandDate = that.data.nowDate;
    PayMent(JSON.stringify(dataObj), res => {
      wx.requestPayment({
        timeStamp: res.data.data.timeStamp,
        nonceStr: res.data.data.NonceStr,
        package: res.data.data.Package,
        signType: res.data.data.signType,
        paySign: res.data.data.paySign,
        success(re) {
          wx.hideLoading();
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
        },
        fail(fails) {
          wx.hideLoading();
          showToast({
            title: fails
          });
        }
      })
    },err=>{
      wx.hideLoading()
      console.log(err)
      showToast({
        title: err.data.info
      });
    })
  },
  InitPlaceDetail(id){
    let that = this;
    wx.showLoading({
      title: '数据加载中...',
      mask: true
    })
    InitPlaceDetail(id, res => {
      that.setData({
        shopInfo: res.data.data
      })
      wx.hideLoading()
    }, err => {
      wx.hideLoading()
    })
  },
  showDate(){
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    let that = this;
    let islogin = wx.getStorageSync('islogin');
    let isMember = false;
    let id = wx.getStorageSync('id');
    if(!islogin){
      wx.hideLoading();
      wx.reLaunch({
        url: '../../mine/login/login',
      })
      return false;
    }
   
    UserVIP(id, res => {
      let cardList = res.data.data;
      for(let i in cardList){
        if(cardList[i].storeid === that.data.spaceId){
          isMember = true
        }
      }
      
      if(cardList.length > 0 && isMember){
          
          let dataObj = {
      
          };
          let date = new Date();
          let date1 = date.toLocaleDateString();
          dataObj.LWT_StoreId = that.data.spaceId;
          dataObj.LWT_DateTime = date1;
          that.setData({
            showDate: false,
            dateShow: true,
          })
          that.InitPlaceWorkTime(dataObj)
        
      }else{
        isMember = false;
        wx.hideLoading();
        wx.navigateTo({
              url: `../../mine/joinMember/joinMember?spaceId=${that.data.spaceId}`,
            })
        
      }
      wx.setStorage({
        key: 'isMember',
        data: isMember,
      })
    }, res => {
        wx.navigateTo({
              url: `../../mine/joinMember/joinMember?spaceId=${that.data.spaceId}`,
            })
      })
   
  },
  InitPlaceWorkTime(dataObj){
    let that = this;
    InitPlaceWorkTime(JSON.stringify(dataObj), res => {
      wx.hideLoading();
      console.log(res.data.data);
      let spaceDateList = res.data.data;
      that.setData({
        spaceDateList: spaceDateList
      })
    }, res => {
      
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
  showDate0(e){
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
          mask: true
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
  toShop(e){
    let that = this;
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    that.formSubmit(e.currentTarget.dataset.address)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let LWU_IsDistributor = wx.getStorageSync('LWU_IsDistributor')
    that.setData({
      LWU_IsDistributor: LWU_IsDistributor
    })
    that.dealWeekData();
    that.InitPlaceDetail(options.spaceId);
    let date = that.GetDateStr(0)
    that.setData({
      spaceId: options.spaceId,
      nowDate: date
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