// https://www.acmicpc.net/problem/8958
// "OOXXOXXOOO"와 같은 OX퀴즈의 결과가 있다. O는 문제를 맞은 것이고, X는 문제를 틀린 것이다. 문제를 맞은 경우 그 문제의 점수는 그 문제까지 연속된 O의 개수가 된다. 예를 들어, 10번 문제의 점수는 3이 된다.
// "OOXXOXXOOO"의 점수는 1+2+0+0+1+0+0+1+2+3 = 10점이다.
// OX퀴즈의 결과가 주어졌을 때, 점수를 구하는 프로그램을 작성하시오.
const fs = require('fs');
let input = fs.readFileSync('/dev/stdin').toString().split('\n');
input.splice(0, 1);
input.splice(input.length - 1, 1);

var solution = (str) => {
  let inputArr = str.split('');
  let plus = 1;

  return inputArr.reduce((acc, cur) => {
    cur === 'O' ? (acc += plus, plus++) : plus = 1;
    return acc;
  }, 0);
}

input.forEach((element) => {
  console.log(solution(element));
});

//백준 문제 여러줄 나올때 마지막줄도 \n을 한다는 것을 조심!!!!!!
