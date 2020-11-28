//https://leetcode.com/problems/roman-to-integer/submissions/
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const roman = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };
  const inputArray = s.split('');
  let temp = '';
  let result = 0;
  inputArray.forEach(ele => {
    result += roman[ele];
    if (temp === 'I') {
      if (ele === 'V' || ele === 'X') {
        result -= roman[temp] * 2;
      }
    } else if (temp === 'X') {
      if (ele === 'L' || ele === 'C') {
        result -= roman[temp] * 2;
      }
    } else if (temp === 'C') {
      if (ele === 'D' || ele === 'M') {
        result -= roman[temp] * 2;
      }
    }
    temp = ele;
  })
  return result;
};