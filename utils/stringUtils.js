/**
 * 空字符串检验
 * @param str:String  待校验字符串
 */
function isBlank(str) {
  return !str || typeof str != 'string' || str.length <= 0 || str.match(/^\s*$/) || str === undefined || str === null;
}


/**
 * 字符串非空检验
 * @param str:String  待校验字符串
 * 
 */
function isNotBlank(str) {
  return !isBlank(str)
}


/**
 * 判断对象是否为空
 */
function isEmptyObject(obj) {

  for (let key in obj) {
    return false;
  }

  return true;
}



module.exports = {
  isNotBlank: isNotBlank,
  isBlank: isBlank,
  isEmptyObject: isEmptyObject
}