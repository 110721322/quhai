// pages/mine/minefx/minefx.js
import {
  PersonRebate,
  CreateWxCode,
} from '../../../apis/quhaiApis';
let QRCode = require("../../../utils/qrcodeImg.js");
let drawQrcode = require("../../../utils/weapp.qrcode.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabShow: false,
    hideCode: true
  },
  showTip(){
    wx.showModal({
      title: '提示',
      content: '提现申请成功!审核通过后24小时内\n到账微信钱包,审核时间2个工作日内!',
      showCancel: false,
      confirmColor: '#5CAE04',
      success (res) {
         
      }
    })
  },
  showHidden(){
    this.setData({
      tabShow: false,
      hideCode: true
    })
  },
  showCode(){
    this.setData({
      tabShow: true,
      hideCode: false
    })
  },
  goInvolved(){
    wx.navigateTo({
      url: '../fxDetail/fxDetail',
    })
  },
  PersonRebate(){
    let that = this;
    let dataObj = {};
    let page = {"rows":3,"page":1};
    let id = wx.getStorageSync('id');
    dataObj.page = page;
    dataObj.userid = id;
    PersonRebate(JSON.stringify(dataObj), res => {
     let list = res.data.data;
     that.setData({
      list: list
     })
    }, res => {
      
    })
  },
  CreateWxCode(){
    let that = this;
    let id = wx.getStorageSync('openid');
    
    CreateWxCode(id, res => {
      var base64 = res.data.data.base64.replace(/[\r\n]/g, ""); 
      var array = wx.base64ToArrayBuffer(base64)
      const req = wx.getFileSystemManager();
      const FILE_BASE_NAME = 'mine_base64';
      const filePath = wx.env.USER_DATA_PATH + '/' + FILE_BASE_NAME + '.png';
      req.writeFile({
        filePath,
        data: array,
        encoding: 'binary',
        success() {
          console.log(filePath)
          that.setData({
            errormsg: '',
            code: filePath //图片地址
          })
        },
        fail() {},
      })
     let url = 'data:image/png;base64,'+res.data.data.base64;
     console.log(url)
     that.setData({
      url: url
     })
    }, res => {
      
    })
  },
  
saveImage (e) {
  let _this = this
  wx.showActionSheet({  //显示操作菜单
      itemList: ['保存到相册'],
      success(res) {
          let url = e.currentTarget.dataset.url;
          wx.getSetting({
              success: (res) => {
                  if (!res.authSetting['scope.writePhotosAlbum']) { //判断是否授权
                      wx.authorize({  //如果没授权，则向用户发起授权请求
                          scope: 'scope.writePhotosAlbum',
                          success: () => {
                              // 同意授权
                              _this.saveImgInner(url);
                          },
                          fail: (res) => {
                              console.log(res);
                              wx.showModal({
                                  title: '保存失败',
                                  content: '请开启访问手机相册权限',
                                  success(res) {
                                      wx.openSetting()
                                  }
                              })
                          }
                      })
                  } else {
                      // 已经授权了
                    _this.saveImgInner(_this.data.code);
        
                  }
              },
              fail: (res) => {
                  console.log(res);
              }
          })   
      },
      fail(res) {
          console.log(res.errMsg)
      }
  })
},
// 长按保存功能--保存部分
saveImgInner (url) {
  wx.getImageInfo({
      src: url,
      success: (res) => {
          let path = res.path;
          wx.saveImageToPhotosAlbum({
              filePath: path,
              success: (res) => {
                  console.log(res);
                  wx.showToast({
                      title: '已保存到相册',
                  })
              },
              fail: (res) => {
                  console.log(res);
              }
          })
      },
      fail: (res) => {
          console.log(res);
      }
  })
},
  /**
   * 创建二维码,可以带图片logo
   */
  makeQrCode: function (code) {
    let that = this;
    let qrcodeParam = {};
    qrcodeParam.code = code;
    qrcodeParam.source = "order";
    QRCode.qrApi.draw(JSON.stringify(qrcodeParam), "orderQrcode", 360, 360, null); // 使用自定义图片
  },
  getInfo(){
    let that = this;
    wx.getSystemInfo({
      success (res) {
        console.log(res.windowWidth)
        that.setData({
          windowWidth: res.windowWidth
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let code = '1222222222';
    that.getInfo();
    that.makeQrCode(code);
    that.PersonRebate();
    that.CreateWxCode();
    // drawQrcode({
    //   width: that.data.windowWidth,
    //   height: that.data.windowWidth,
    //   canvasId: 'orderQrcode',
    //   // ctx: wx.createCanvasContext('myQrcode'),
    //   text: 'https://github.com/yingye',
    //   // v1.0.0+版本支持在二维码上绘制图片
    //   // ctx: wx.createCanvasContext('myQrcode'),
    //   image: {
    //        imageResource: '../../../image/quhai.png',
    //        dx: 70,
    //        dy: 70,
    //      dWidth: 60,
    //      dHeight: 60
    //    },
    //    callback: function (e) { console.log('e', e) }
    //   })
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