const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let cityIndexes = list => {
  let cityIndex = [];
  for (let i = 0; i < 26; i++) {
    cityIndex[i] = String.fromCharCode(65 + i)
  }
  return cityIndex
}



/**
 * 中文首字母排序
 * 
 */
function sortChinese(list) {
  list.sort(function (item1, item2) {
    return item1.fullname.localeCompare(item2.fullname, 'zh-CN');
  })
}


/**
 * 时间格式化
 * 
 */
function dateFormat(fmt, date) {
  var o = {
    "M+": date.getMonth() + 1,                 //月份   
    "d+": date.getDate(),                    //日   
    "h+": date.getHours(),                   //小时   
    "m+": date.getMinutes(),                 //分   
    "s+": date.getSeconds(),                 //秒   
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
    "S": date.getMilliseconds()             //毫秒   
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


module.exports = {
  formatTime: formatTime,
  cityIndexes: cityIndexes,
  sortChinese,
  dateFormat,
  formatNumber
}