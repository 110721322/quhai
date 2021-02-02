/**
 * 
 * 公共方法封装，封装一些通用使用的方法
 * 可自行扩展
 * @author yhq
 * 
 */
import {
  isBlank
} from './stringUtils';


/**
 * 显示消息提示框
 * <pre>
 * api地址: https://developers.weixin.qq.com/miniprogram/dev/api/wx.showToast.html
 * options 对于字段
 * {
 *    title:String   //提示的内容
 *    icon:String  //图标 默认 success
 *    duration:number //提示的延迟时间 默认1500
 *    image:string      //自定义图标的本地路径，image 的优先级高于 icon
 *    mask:boolean   是否显示透明蒙层，防止触摸穿透
 *    success 成功回调
 *    fail 失败回调
 * 
 * }
 * </pre>
 */
let showToast = function (options) {
  wx.showToast({
    title: options.title || "提示",
    icon: options.icon || 'none',
    duration: options.duration || 1500,
    image: options.image,
    mask: options.mask,
    success: options.success,
    fail: options.fail
  })
}



/**
 * 显示模态对话框
 * <pre>
 * options:{
 * title:''        //标题
 * content:""// 内容
 * success:   //成功回调
 * } 
 * api地址:https://developers.weixin.qq.com/miniprogram/dev/api/wx.showModal.html
 * </pre>
 */
let showModal = function (options) {
  wx.showModal({
    title: options.title || '提示',
    content: options.content || '这是一个模态弹窗',
    showCancel: options.showCancel || false,
    success: options.success
  })
}


/**
 * 显示 loading 提示框。
 * 需主动调用 wx.hideLoading 才能关闭提示框
 * <pre>
 * options:{
 * title:"", 标题
 * mask:"", 是否显示透明蒙层，防止触摸穿透
 * success:  //成功回调
 * fail        //失败回调
 * }
 * </pre>
 * api文档：https://developers.weixin.qq.com/miniprogram/dev/api/wx.showLoading.html
 */
let showLoading = function (options) {
  wx.showLoading({
    title: options.title || '加载中',
    mask: options.mask || true,
    success: options.success,
    fail: options.fail
  })

}

/**
 * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。
 * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
 * <pre>
 * options:{
 * url:"", 跳转路径
 * success:"", 成功回调
 * fail:"", 失败回调
 * }
 * </pre>
 */
let navigateTo = function (options) {
  wx.navigateTo({
    url: options.url

  })
}



/**
 * 显示操作菜单
 * <pre>
 * options:{
 * itemList:Array , //元素列表
 * itemColor:String  按钮颜色
 * success:   成功回调
 * fail           失败回调
 * }
 * api文档:https://developers.weixin.qq.com/miniprogram/dev/api/wx.showActionSheet.html
 * </pre>
 */
let showActionSheet = function (options) {
  wx.showActionSheet({
    itemList: options.itemList || [],
    itemColor: options.itemColor || '#000000',
    success: options.success,
    fail: options.fail
  })
}


let callback = function (callback) {
  return callback;
}

/**
 * 登录前置校验
 * <pre>
 *  登录校验
 *  已登录返回true
 *  未登录或登录失败返回false
 * </pre>
 */
function loginPreCheck() {
  try {
    let isLogin = wx.getStorageSync('isLogin');
    if (isBlank(isLogin)) {
      return false;
    } else {
      return true;
    }

  } catch (e) {
    return false;
  }

}


/**
 * 距离转换
 */
function converDistance(distance) {
  var distance = new Number(distance).toFixed(1);
  if (distance < 1000) {
    distance = distance + 'm'
  } else if (distance >= 1000) {
    distance = (Math.round(distance / 100) / 10).toFixed(1) + 'km'
  }
  return distance;
}

/**
 * 判断商家是否休息
 */
function onRest(openTime, closeTime) {
  if (openTime != null && closeTime != null) {
    let openHour = openTime,
      closeHour = closeTime,
      nowTime = new Date(),
      open = new Date(),
      close = new Date(),
      isRest;
    let strOpen = openHour.split(":");
    let strClose = closeHour.split(":");

    open.setHours(strOpen[0]);
    open.setMinutes(strOpen[1]);
    open.setSeconds(strOpen[2]);
    close.setHours(strClose[0]);
    close.setMinutes(strClose[1]);
    close.setSeconds(strClose[2]);
    if (close.getTime() - open.getTime() > 0) {
      if (nowTime.getTime() - open.getTime() > 0 && nowTime.getTime() - close.getTime() < 0) {
        isRest = true;
      } else {
        isRest = false;
      }
    } else {
      if (nowTime.getTime() - open.getTime() > 0 || nowTime.getTime() - close.getTime() < 0) {
        isRest = true;
      } else {
        isRest = false;
      }
    }

    return isRest
  }
}


/**
 * 获取图片水印
 */
function getWaterMark() {
  return "?watermark/1/image/aHR0cDovL3Jlbnh1YW53YW5nLmNvbS8lRTYlQjAlQjQlRTUlOEQlQjAucG5n/dissolve/100/gravity/SouthEast/dx/15/dy/10|imageslim";
}

module.exports = {
  showToast,
  showModal,
  showLoading,
  showActionSheet,
  navigateTo,
  callback,
  loginPreCheck,
  converDistance,
  onRest,
  getWaterMark
}