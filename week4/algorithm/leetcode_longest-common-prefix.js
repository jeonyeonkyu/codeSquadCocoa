//https://leetcode.com/problems/longest-common-prefix/submissions/
//앞에서부터 일치하는 것만 검색됨 중간부터 일치하는건 안되는 코드
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (strs.length === 0) return "";
  
  let prefix = strs[0];

  for (let i = 1; i < strs.length; i++)
    while (strs[i].indexOf(prefix) != 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === '') return "";
    }
  return prefix;
};