/**
 * 腾讯位置服务为微信小程序提供了基础的标点能力、线和圆的绘制接口等地图组件和位置展示、地图选点等地图API位置服务能力支持，
 * 使得开发者可以自由地实现  自己的微信小程序产品。 在此基础上，腾讯位置服务微信小程序JavaScript SDK是专为小程序开发者提供的LBS数据服务工具包，
 * 可以在小程序中调用腾讯位置服务的POI检索、关键词输入提示、地址解析、逆地址解析、行政区划和距离计算等数据服务
 * 
 * 文档地址:https://lbs.qq.com/qqmap_wx_jssdk/index.html
 *  腾讯位置服务工具类
 * @author yhq
 */
const QQMapWX = require('../lib/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js');
const common = require('common.js');

//实例化api
let qqMapSdk = new QQMapWX({
  key: 'XJ6BZ-NJ2CX-AXM4J-TBDVI-FHDY6-FFFGD'
})


/**
 * 地点搜索，搜索周边poi，
 * <p>
 *  比如：“酒店” “餐饮” “娱乐” “学校” 等等
 * </p>
 *
 */
var search = function (keyWord, region, location, success, fail) {
  //前置校验
  if (typeof location !== Object) {
    throw Error("位置信息输入有误,请传入位置对象");
  }
  qqMapSdk.search({
    keyword: keyWord,
    region: region,
    location: location,
    success: success,
    fail: fail
  })
}

/**
 * 坐标到坐标所在位置的文字描述的转换
 * 输入坐标返回地理位置信息和附近poi列表
 * <pre>
 * 例
 * location:{
 *   latitude: 39.984060,
 *   longitude: 116.307520
 * }
 * 
 * </pre>
 */
var reverseGeocoder = function (options) {
  qqMapSdk.reverseGeocoder({
    location: options.location,
    success: options.success,
    fail: options.fail
  });
}

var geocoder = function (options) {
  qqMapSdk.geocoder({
    address: options.address,
    success: options.success,
    fail: options.fail
  });
}

var getSuggestion = function (options) {
  qqMapSdk.getSuggestion({
    keyword: options.keyword,
    region: options.region,
    success: options.success,
    fail: options.fail
  });
}



/**
 * 获取全国省市区列表数据
 * <pre>
 * type: 为1表示获取省数据
 *    为2表示获取城市数据
 *    为3表示获取县区数据
 * 
 * </pre>
 */
var getCityList = function (type, callback) {

  qqMapSdk.getCityList({
    success: function (res) {
      var list = res.result[type];
      callback(res.result[type]);
    }
  })
}

var getDistance = function (latFrom, lngFrom, latTo, lngTo) {
  qqMapSdk.getDistance(
    latFrom,
    lngFrom,
    latTo,
    lngTo)
}



module.exports = {
  qqMapSdk,
  search,
  reverseGeocoder,
  geocoder,
  getSuggestion,
  getCityList,
  getDistance
};