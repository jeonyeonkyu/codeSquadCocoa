//https://www.acmicpc.net/problem/1000
//두 정수 A와 B를 입력받은 다음, A+B를 출력하는 프로그램을 작성하시오.
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split(' ');
const a = parseInt(input[0]);
const b = parseInt(input[1]);
const solution = (A, B) => A + B;

console.log(solution(a, b));

// 이 코드도 동작함
// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });
 
// let input = [];
 
// rl.on('line', function (line) {
//     input = line.split(' ').map((el) => parseInt(el));
// }).on('close', function () {
//     console.log(input[0] + input[1]);
//     process.exit();
// });