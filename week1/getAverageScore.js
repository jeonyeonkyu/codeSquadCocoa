// 아래 예시는 네 명의 학생에 대한 과목 점수이다.
// 각 학생은 3가지 과목에 대한 점수를 가지고 있다.
// 각 학생의 평균점수(1)와 모든 학생의 최고점수의 평균점수(2)를 출력하라.

const getAverageScore = (args) => {
    const average = args.map(([one, two, three]) => ((one + two + three) / 3));
    const maxAverage = args.map((element) => (Math.max(...element))).reduce((acc, cur) => acc + cur) / args.length;

    return {
        average,
        maxAverage
    }
}

const grades = [[88, 76, 77], [33, 44, 44], [90, 100, 94], [30, 44, 98]];

const {average, maxAverage} = getAverageScore(grades);

console.log(average);
console.log(maxAverage);