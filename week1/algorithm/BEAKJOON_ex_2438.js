//https://www.acmicpc.net/problem/2438
//첫째 줄에는 별 1개, 둘째 줄에는 별 2개, N번째 줄에는 별 N개를 찍는 문제
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin');
const a = parseInt(input);
const solution = (A) => {
  Array.from({ length: A }, (_, input) => input+1)
  .forEach((element,_) => {
    const star = "*";
    let result = '';
    for(let i = 0; i<element;i++){
      result += star;
    }
    console.log(result);
  })
};

solution(a);