//https://programmers.co.kr/learn/courses/30/lessons/42840
//1번 문제부터 마지막 문제까지의 정답이 순서대로 들은 배열 answers가 주어졌을 때, 
//가장 많은 문제를 맞힌 사람이 누구인지 배열에 담아 return 하도록 solution 함수를 작성해주세요.

function solution(answers) {
  let people1 = [1, 2, 3, 4, 5]
  let people2 = [2, 1, 2, 3, 2, 4, 2, 5]
  let people3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5]
  let correct1 = 0, correct2 = 0, correct3 = 0;

  answers.forEach((ele, index) => {
    if (ele === people1[index % people1.length]) {
      correct1++;
    }
    if (ele === people2[index % people2.length]) {
      correct2++;
    }
    if (ele === people3[index % people3.length]) {
      correct3++;
    }
  });
  const answer = [correct1, correct2, correct3];
  const score_1st = Math.max(...answer);
  const result = [];
  answer.forEach((ele, index) => {
    if (ele === score_1st) {
      result.push(index + 1);
    }
  });
  return result;
}