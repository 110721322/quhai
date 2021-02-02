/**
 * 日志处理工具类
 * @author  yhq
 */
const util = require("../utils/util.js");

var logs = wx.getStorageSync('logs') || []

let infos = null;

let errors = null;

/**
 * info 日志
 * @param template:String  日志打印模板
 * @param data:Object    日志打印数据
 */
let logInfo = function(template, data) {
  infos = `${util.formatTime(new Date)} ${template}:${JSON.stringify(data)}`;
  console.log(infos);
}


/**
 * error，warn 日志
 *  @param template:String  日志打印模板
 * @param data:Object    日志打印数据
 */
let logWarn = function(template, data) {
  errors = `${util.formatTime(new Date)} ${template}:${JSON.stringify(data)}`;
  console.error(errors);
}




/**
 * 初始化缓存
 * @param data:any
 */
let initCache = function(data) {
  //存入缓存
  wx.setStorageSync('logs', logs);
}


module.exports = {
  logInfo,
  logWarn
}