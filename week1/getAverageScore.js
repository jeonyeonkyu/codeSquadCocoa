// 아래 예시는 네 명의 학생에 대한 과목 점수이다.
// 각 학생은 3가지 과목에 대한 점수를 가지고 있다.
// 각 학생의 평균점수(1)와 모든 학생의 최고점수의 평균점수(2)를 출력하라.

const getAverageScore = (args) => {
    const firstResult = [];
    args.forEach((element) => firstResult.push(element.reduce((acc, cur) => acc + cur) / 3));
    console.log(firstResult);

    const maxAverage = [];
    args.forEach((element) => maxAverage.push(Math.max(...element)));
    const secondResult = maxAverage.reduce((acc, cur) => acc + cur) / args.length;
    console.log(secondResult);
}


const grades = [[88, 76, 77], [33, 44, 44], [90, 100, 94], [30, 44, 98]];
getAverageScore(grades);