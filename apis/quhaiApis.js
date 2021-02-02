/**
 *  封装`quhai`所有接口
 */
import {
  ajax,
  sign
} from "../utils/ajax";
import router from "../utils/router";


/**
 * 获取场地分类
 */
function getSpaceType( success, fail) {
  ajax({
    url: `${router.getSpaceType}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 获取场地http://139.155.92.115/Applet/GetSpace?data=
 */
function getSpace(dataObj, success, fail) {
  ajax({
    url: `${router.getSpace}${dataObj}` ,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 获取场地时间段
 */
function getSpaceScheduleInfo(spaceId, success, fail) {
  ajax({
    url: `${router.getSpaceScheduleInfo}` + spaceId,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 通过Code获取OPENIDGetUserInfoByOpenID
 */
function getOpenId(code,success, fail) {
  ajax({
    url: `${router.getOpenId}${code}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 根据openid获取用户信息
 */
function getUserInfoByOpenID(code, success, fail) {
  ajax({
    url: `${router.getUserInfoByOpenID}${code}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 保存用户信息(新增或更新)
 */
function saveUserInfo(param, success, fail) {
  ajax({
    url: `${router.saveUserInfo}`,
    method: 'POST',
    data: {
      "data": param
    },
    success: success,
    fail: fail
  })
}

/**
 * 预约订单
 */
function orderInsert(param, success, fail) {
  ajax({
    url: `${router.orderInsert}`,
    method: 'POST',
    data: {
      "data": param
    },
    success: success,
    fail: fail
  })
}

/**
 * 取消订单
 */
function orderCancel(code, success, fail) {
  ajax({
    url: `${router.orderCancel}${code}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 获取预约|参与单
 * {"Handle":"101或者102","OpenId":""}
 */
function getOrderList(dataObj, success, fail) {
  ajax({
    url: `${router.getOrderList}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 获取手机号
 */
function getUserPhone(data, success, fail) {
  ajax({
    url: `${router.getUserPhone}${data}`,
    method: 'POST',
    data: {
      "jscode":"",
      "encryptedData":"",
      "iv":""
    },
    success: success,
    fail: fail
  })
}

/**
 * 获取会员信息
 */
function getMemberInfo(dataObj, success, fail) {
  ajax({
    url: `${router.getMemberInfo}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 获取首页轮播图
 */
function getBanner( success, fail) {
  ajax({
    url: `${router.getBanner}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 获取会员卡列表
 */
function getCardList(spaceId ,success, fail) {
  ajax({
    url: `${router.getCardList}${spaceId}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 * 支付
 */
function orderPay(param, success, fail) {
  ajax({
    url: `${router.orderPay}`,
    method: 'POST',
    data: {
      "data": param
    },
    success: success,
    fail: fail
  })
}

/**
 * 支付成功
 */
function PaySuccess(orderid ,success, fail) {
  ajax({
    url: `${router.PaySuccess}${orderid}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}


/**
 * 获取【首页】轮播海报
 */
function InitBanner(success, fail) {
  ajax({
    url: `${router.InitBanner}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【首页】场地类目
 */
function InitPlaceType(success, fail) {
  ajax({
    url: `${router.InitPlaceType}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【首页】店铺信息
 */
function InitPlace(dataObj, success, fail) {
  ajax({ 
    url: `${router.InitPlace}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【首页】场地详细信息
 */
function InitPlaceDetail(dataObj, success, fail) {
  ajax({
    url: `${router.InitPlaceDetail}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【特价商城】商品详细信息
 */
function InitDiscountCommodity(id, success, fail) {
  ajax({
    url: `${router.InitDiscountCommodity}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【趣商城】商品类目
 */
function InitPaltformCommodityType(success, fail) {
  ajax({
    url: `${router.InitPaltformCommodityType}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【趣商城】产品信息
 */
function InitPaltformCommodity(id, success, fail) {
  ajax({
    url: `${router.InitPaltformCommodity}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【趣商城】产品详情
 */
function InitPaltformCommodityDetail(id, success, fail) {
  ajax({
    url: `${router.InitPaltformCommodityDetail}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【用户】收货地址信息
 */
function InitPersonAddress(id, success, fail) {
  ajax({
    url: `${router.InitPersonAddress}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取【用户】收货地址信息(新增、删除、修改)
 */
function ManagePersonAddress(dataObj, success, fail) {
  ajax({
    url: `${router.ManagePersonAddress}`,
    method: 'POST',
    data: {
      "data": dataObj
    },
    success: success,
    fail: fail
  })
}

/**
 *申请成为分销商
 */
function ApplyDistributor(id, success, fail) {
  ajax({
    url: `${router.ApplyDistributor}`,
    method: 'POST',
    data: {
      "data": id
    },
    success: success,
    fail: fail
  })
}

/**
 * 获取手机号码和用户的OPENID
 */
function UserPhone(param, success, fail) {
  ajax({
    url: `${router.UserPhone}`,
    method: 'POST',
    data: {
      "data": param
    },
    success: success,
    fail: fail
  })
}

/**
 *获取门店可预约的时间段
 */
function InitPlaceWorkTime(dataObj, success, fail) {
  ajax({
    url: `${router.InitPlaceWorkTime}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *场馆预约
 */
function OrderPlace(dataObj, success, fail) {
  ajax({
    url: `${router.OrderPlace}`,
    method: 'POST',
    data: {
      "data": dataObj
    },
    success: success,
    fail: fail
  })
}

/**
 *场馆预约单
 */
function InitOrderList(dataObj, success, fail) {
  ajax({
    url: `${router.InitOrderList}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *取消预约
 */
function CancelOrder(id, success, fail) {
  ajax({
    url: `${router.CancelOrder}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取用户已购买的会员
 */
function UserVIP(id, success, fail) {
  ajax({
    url: `${router.UserVIP}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取用户信息
 */
function UserInfoByID(id, success, fail) {
  ajax({
    url: `${router.UserInfoByID}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *保存用户信息
 */
function SaveUserInfo(dataObj, success, fail) {
  ajax({
    url: `${router.SaveUserInfo}`,
    method: 'POST',
    data: {
      "data": dataObj
    },
    success: success,
    fail: fail
  })
}

/**
 *加载会员卡
 */
function InitPlaceCard(dataObj, success, fail) {
  ajax({
    url: `${router.InitPlaceCard}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *发起支付
 */
function PayMent(dataObj, success, fail) {
  ajax({
    url: `${router.PayMent}`,
    method: 'POST',
    data: {
      "data": dataObj
    },
    success: success,
    fail: fail
  })
}

/**
 *分销明细
 */
function PersonRebate(dataObj, success, fail) {
  ajax({
    url: `${router.PersonRebate}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *生成分销小程序码
 */
function CreateWxCode(id, success, fail) {
  ajax({
    url: `${router.CreateWxCode}${id}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *获取用户最近的一次会员卡购买记录
 */
function UserCardRenewLog(dataObj, success, fail) {
  ajax({
    url: `${router.UserCardRenewLog}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *我的订单
 */
function OrderList(dataObj, success, fail) {
  ajax({
    url: `${router.OrderList}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}

/**
 *确认收货
 */
function OrderConfirm(dataObj, success, fail) {
  ajax({
    url: `${router.OrderConfirm}${dataObj}`,
    method: 'POST',
    data: {
      "data": dataObj
    },
    success: success,
    fail: fail
  })
}

/**
 *预约单到场确认
 */
function ArriveConfirm(dataObj, success, fail) {
  ajax({
    url: `${router.ArriveConfirm}${dataObj}`,
    method: 'POST',
    data: {
      "data": dataObj
    },
    success: success,
    fail: fail
  })
}

/**
 *验证是否是分销商
 */
function VerifyDistributor(dataObj, success, fail) {
  ajax({
    url: `${router.VerifyDistributor}${dataObj}`,
    method: 'GET',
    success: success,
    fail: fail
  })
}


module.exports = {
  getSpaceType,
  getSpace,
  getSpaceScheduleInfo,
  getOpenId,
  getUserInfoByOpenID,
  saveUserInfo,
  orderInsert,
  orderCancel,
  getOrderList,
  getUserPhone,
  getMemberInfo,
  getBanner,
  getCardList,
  orderPay,
  PaySuccess,
  InitBanner,
  InitPlaceType,
  InitPlace,
  InitPlaceDetail,
  InitDiscountCommodity,
  InitPaltformCommodityType,
  InitPaltformCommodity,
  InitPaltformCommodityDetail,
  InitPersonAddress,
  ManagePersonAddress,
  ApplyDistributor,
  UserPhone,
  InitPlaceWorkTime,
  OrderPlace,
  InitOrderList,
  CancelOrder,
  UserVIP,
  UserInfoByID,
  SaveUserInfo,
  InitPlaceCard,
  PayMent,
  PersonRebate,
  CreateWxCode,
  UserCardRenewLog,
  OrderConfirm,
  OrderList,
  VerifyDistributor,
  ArriveConfirm,
}