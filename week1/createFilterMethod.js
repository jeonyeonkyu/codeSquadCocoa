//reduce함수보단 forEach를 구현해보는게 쉬울 것 같아 forEach함수 만들어보기
// const myFilter = (arr, callback) => {
//     //여기에 구현
// }
// const result = myFilter(arr, (ele,index) => {...});
const myFilter = (arr, fn) => {
  let result = [];
  for (var index = 0; index < arr.length; index++) {
    if (fn(arr[index], index)) {
      result.push(arr[index]);
    };
  }
  return result;
}
var a = [1, 2, 3];
console.log(myFilter(a, (element, index) => element % 2 === 0));
