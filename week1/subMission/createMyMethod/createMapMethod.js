//reduce함수보단 forEach를 구현해보는게 쉬울 것 같아 forEach함수 만들어보기
// const myMap = (arr, callback) => {
//     //여기에 구현
// }
// const result = myMap(arr, (ele,index) => {...});
const myMap = (arr, fn) => {
  let result = [];
  for (var index = 0; index < arr.length; index++) {
    result.push(fn(arr[index], index));
  }
  return result;
}
var a = [7, 6, 5];
console.log(myMap(a, (element, index) => element + index));
console.log(a.map((element, index) => element + index));
