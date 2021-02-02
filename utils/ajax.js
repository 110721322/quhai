import {
  dateFormat
} from './util';
// import md5 from './md5';
import {
  showToast
} from './common';

import { logInfo, logWarn} from './logUtils';


/**
 * 异步请求封装
 * options：{
 * url:请求地址
 * data:请求参数
 * method： 请求方法
 * success：成功回调
 * fail:失败回调，需要调用者自己处理异常提示
 * }
 */
function ajax(options) {
  wx.request({
    url: options.url || '',
    data: options.data || {},
    header: {
      'content-type': 'application/json' // 默认值
    },
    method: options.method || 'GET',
    success(res) {
      let statusCode = res.statusCode;
      let success = options.success;
      let fail = options.fail;
      if (typeof success !== 'function') {
        throw new Error("success is not a function ");
      }
      
      console.log("==========start===============");
      logInfo("请求地址", options.url);
      logInfo("请求参数", options.data || {});
      logInfo("响应结果", res);
      console.log("==========end=================");

      //请求成功
      if (200 <= res.data.code && res.data.code < 300) {
        if (res.data.state === 'fail'){
          fail(res);
        }else{
          success(res);
        }
      } else {
        //handleError();
        //异常回调
        fail(res);
      }
    },
    fail(res) {
      logWarn(`${options.url},接口异常信息`, res);
      
      let fail = options.fail;
      
      if (typeof fail !== 'function') {
        throw new Error("fail is not a function ");
      }

      showToast({
        title: res.data.info
      });

      fail(res);
      
    }
  })
}

/**
 * 处理异常提示
 */
function handleError(){
  showToast({
    title: "网络异常，请稍候再试!"
  });
}



/**
 * 请求接口加签
 * signParam：String 需要加签的字段
 * signMethod：String 需要加签的方法名称
 */
function sign(signParam, signMethod) {
  let result = `${signParam}${dateFormat('yyyyMMdd', new Date())}${signMethod}`;
  return md5.hexMD5(result).toUpperCase();
}


module.exports = {
  ajax,
  sign
}