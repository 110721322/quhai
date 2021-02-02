// pages/home/detail/detail.js
import {
  InitPaltformCommodityDetail,
  InitPersonAddress,
  ManagePersonAddress,
  PayMent,
} from '../../../apis/quhaiApis';
import {
  showToast,
} from '../../../utils/common';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperItem: ['../../../image/membert.jpg'],
    value1: 1,
    region: ['选择省', '选择市', '选择区'],
    customItem: '全部',
    tabShow: false,
    address: true,
    selAddress: true,
    noValue: true,
    name: '',
    tel: '',
    detail: ''
  },
  showAdd(){
    this.setData({
      tabShow: true,
      address: false
    })
  },
  showSel(){
    this.setData({
      tabShow: true,
      selAddress: false
    })
  },
  toSel(e){
    let item =  e.currentTarget.dataset.item;
    this.setData({
      default: item,
      tabShow: false,
      selAddress: true
    })
  },
  showHidden() {
    this.setData({
      tabShow: false,
      address: true,
      selAddress: true
    })
  },
  getName(e){
    this.setData({
      name: e.detail.detail.value
    })
    
    this.setValue();
  },
  getTel(e){
    this.setData({
      tel: e.detail.detail.value
    })
    this.setValue();
  },
  getAddress(e){
    this.setData({
      detail: e.detail.detail.value
    })
    this.setValue();
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
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
    this.setValue();
  },
  setValue(){
    let that = this, value;
    if(that.data.name != '' && that.data.tel != '' && that.data.detail != '' && that.data.region[0] != '选择省' && that.data.region[1] != '选择市' && that.data.region[2] != '选择区'){
      value = false;
    }else{
      value = true
    }
    console.log('set')
    that.setData({
      noValue: value
    })
  },
  InitPaltformCommodityDetail(id){
    let that = this;
    InitPaltformCommodityDetail(id, res => {
      that.setData({
        list: res.data.data
      })
    }, res => {
      
    })
  },
  InitPersonAddress(){
    let that = this;
    let id = wx.getStorageSync('id');
    InitPersonAddress(id, res => {
      let list = res.data.data, address;
      for(let i in list){
        if(list[i].isdefault === '1'){
          address = list[i]
        }
        
      }
      that.setData({
        addressList: list,
        default: address
      })
    }, res => {
      
    })
  },
  ManagePersonAddress(){
    let that = this;
    let id = wx.getStorageSync('id');
    let dataObj = {}
    dataObj.LWA_UserId = id;
    dataObj.LWA_Name = that.data.name;
    dataObj.LWA_Phone = that.data.tel;
    dataObj.LWA_Province = that.data.region[0];
    dataObj.LWA_City = that.data.region[1];
    dataObj.LWA_Area = that.data.region[2];
    dataObj.LWA_Address = that.data.detail;
    dataObj.LWA_IsDefault = 1;
    ManagePersonAddress(JSON.stringify(dataObj), res => {
      showToast({
        title: "保存成功"
      })
      this.setData({
        tabShow: false,
        address: true
      })
      that.InitPersonAddress()
    }, res => {
      
    })
  },
  payMent(){
    let that = this;
    if(!that.data.default){
      showToast({
        title: "请先填写收货地址"
      })
      return false
    }
    wx.showLoading({
      title: '支付中...',
    })
    let id = wx.getStorageSync('id');
    let dataObj = {};
    dataObj.LWT_UserId = id;
    dataObj.LWT_ProductType = 3;
    dataObj.LWT_Number = that.data.value1;
    dataObj.LWT_ProductId = that.data.list.commodityid;
    dataObj.LWT_Address = that.data.default.address;
    dataObj.LWT_Phone = that.data.default.phone;
    dataObj.LWT_ReceiveUser = that.data.default.name;
    
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
    let that = this;
    console.log(options.goodsId)
    let LWU_IsDistributor = wx.getStorageSync('LWU_IsDistributor')
    that.setData({
      LWU_IsDistributor: LWU_IsDistributor
    })
    that.InitPaltformCommodityDetail(options.goodsId)
    that.InitPersonAddress()
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