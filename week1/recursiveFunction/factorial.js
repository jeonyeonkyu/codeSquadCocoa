
//1. factorial 함수
//임의의 숫자(m)를 입력받아 1부터 m까지의 factorial 값을 배열로 담아서 반환하는 함수 만들기.
const factorial = (num) => {
	if (num <= 1) return 1;
	return num * factorial(num - 1);
}

const calculate = (num) => {
	return Array.from({ length: num }, (_, i) => factorial(i + 1));
}

console.log(calculate(4));