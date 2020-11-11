//reduce함수보단 forEach를 구현해보는게 쉬울 것 같아 forEach함수 만들어보기
// const myForEach = (arr, callback) => {
//     //여기에 구현
// }
// const result = myForEach(arr, (ele,index) => {...});
const myForEach = (arr,fn) => {
  for(var index = 0; index<arr.length; index++){
    fn(arr[index],index);
  }
}
var a = [1, 2, 3];
myForEach(a,(element,index) => console.log(element , index));