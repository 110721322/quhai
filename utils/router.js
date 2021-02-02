const config = require("./config.js")
//域名信息
let baseUrl = config.baseUrl;


//路由信息
let router = {
  getOpenId: `${baseUrl}/Applet/OpenID?data=`, //获取openId
  getUserInfo: `${baseUrl}/api_app/getUserInfo`, //获取用户信息
  getSpaceType: `${baseUrl}/Applet/GetSpaceType`, //获取场地分类
  getSpace: `${baseUrl}/Applet/GetSpace?data=`,//获取场地
  getSpaceScheduleInfo: `${baseUrl}/Applet/GetSpaceScheduleInfo?data=`,//获取场地时间段
  saveUserInfo: `${baseUrl}/Applet/SaveUserInfo`,//保存用户信息
  getUserInfoByOpenID: `${baseUrl}/Applet/GetUserInfoByOpenID?data=`,//根据openid获取用户信息
  orderInsert: `${baseUrl}/Applet/OrderInsert`,//预约订单
  orderCancel: `${baseUrl}/Applet/OrderCancel?data=`,//取消订单
  getOrderList: `${baseUrl}/Applet/GetOrderList?data=`,//获取预约|参与单
  getUserPhone: `${baseUrl}/Applet/GetUserPhone`,//获取手机号
  getMemberInfo: `${baseUrl}/Applet/GetMemberInfo?data=`,//获取会员信息
  getBanner: `${baseUrl}/Applet/GetBanner`,//获取首页轮播图
  getCardList: `${baseUrl}/Applet/GetCardList?data=`,//获取销售的会员卡信息
  orderPay: `${baseUrl}/Applet/OrderPay`,//支付
  PaySuccess: `${baseUrl}/Applet/PaySuccess?data=`,//PaySuccess
  InitBanner: `${baseUrl}/InitBanner`,//获取【首页】轮播海报
  InitPlaceType: `${baseUrl}/InitPlaceType`,//获取【首页】场地类目
  InitPlace: `${baseUrl}/InitPlace?data=`,//获取【首页】店铺信息
  InitPlaceDetail: `${baseUrl}/InitPlaceDetail?data=`,//获取【首页】场地详细信息
  InitDiscountCommodity: `${baseUrl}/InitDiscountCommodity?data=`,//获取【特价商城】商品详细信息
  InitPaltformCommodityType: `${baseUrl}/InitPaltformCommodityType`,//获取【趣商城】商品类目
  InitPaltformCommodity: `${baseUrl}/InitPaltformCommodity?data=`,//获取【趣商城】产品信息
  InitPaltformCommodityDetail: `${baseUrl}/InitPaltformCommodityDetail?data=`,//获取【趣商城】产品详情
  InitPersonAddress: `${baseUrl}/InitPersonAddress?data=`,//获取【用户】收货地址信息
  ManagePersonAddress: `${baseUrl}/ManagePersonAddress`,//获取【用户】收货地址信息(新增、删除、修改)
  ApplyDistributor: `${baseUrl}/ApplyDistributor`,//申请成为分销商
  UserPhone: `${baseUrl}/UserPhone`,//获取手机号码和用户的OPENID
  InitPlaceWorkTime: `${baseUrl}/InitPlaceWorkTime?data=`,//获取门店可预约的时间段
  OrderPlace: `${baseUrl}/OrderPlace`,//场馆预约
  InitOrderList: `${baseUrl}/InitOrderList?data=`,//预约单列表
  CancelOrder: `${baseUrl}/CancelOrder?data=`,//取消预约
  UserVIP: `${baseUrl}/UserVIP?data=`,//获取用户会员卡
  InitPlaceCard: `${baseUrl}/InitPlaceCard?data=`,//加载会员卡
  UserInfoByID: `${baseUrl}/UserInfoByID?data=`,//获取用户信息
  SaveUserInfo: `${baseUrl}/SaveUserInfo`,//保存用户信息
  PayMent: `${baseUrl}/PayMent`,//发起订单支付
  PersonRebate: `${baseUrl}/PersonRebate?data=`,//发起订单支付
  CreateWxCode: `${baseUrl}/CreateWxCode?data=`,//获取分销码
  UserCardRenewLog: `${baseUrl}/UserCardRenewLog?data=`,//获取用户最近的一次会员卡购买记录
  OrderList: `${baseUrl}/OrderList?data=`,//我的订单
  OrderConfirm: `${baseUrl}/OrderConfirm?data=`,//确认收货
  VerifyDistributor: `${baseUrl}/VerifyDistributor?data=`,//确认收货
  ArriveConfirm: `${baseUrl}/ArriveConfirm?data=`,//预约单到场确认
}


module.exports = router;