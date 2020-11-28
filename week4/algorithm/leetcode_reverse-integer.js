//https://leetcode.com/problems/reverse-integer/submissions/
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  let minus = '';

  if (x < 0) {
    minus = '-'
    x *= -1;
  }

  let numStr = (x + '').split('');
  let numLength = numStr.length;
  let result = '';

  for (let i = 0; i < numLength; i++) {
    result += numStr.pop();
  }
  result = +(minus + result);
  if (2147483648 <= result || result < -2147483648) {
    result = 0;
  }
  return result;
};
