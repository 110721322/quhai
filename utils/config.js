
//环境变量
let EVN_DOMAIN = {
  dev:  'http://146.56.195.154:7401/QuHi/V2',
  test: 'http://app.quhaizone.com/QuHi/V2',
  prod: 'https://www.quhaizone.com/QuHi/V2',
};

//es 环境变量
let EV_DOMAIN_ES = {
  dev: "http://10.168.17.140:8888/es",
  test: "http://10.168.17.140:8888/es",
  prod: "https://www.renxuanwang.com/es"
};

let EVN = 'prod';
let baseUrl = EVN_DOMAIN[EVN];
let esBaseUrl = EV_DOMAIN_ES[EVN];


module.exports = {
  baseUrl: baseUrl,
  esBaseUrl: esBaseUrl
};