// 2진수 돌아가며 말하기 게임
// 몇 명의 사람들이 모여서 2진수를 한 글자씩 끊어서 말하는 게임을 진행중이다.
// 2진수의 경우 이렇게 말하게 된다.
// 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, …
// 문제1) T개의 숫자까지 M명이 말한다고 할때 이를 모두 출력하는 프로그램을 만든다.
// solution(2,4,2) //2진수, 4개의 숫자까지, 2명이 말할때
// > ["0", "1", "1", "0", "1", "1", "1", "0", "0", "1", "0", "1", "1", "1", "0", "1", "1", "1"]
// 문제3) n진수까지 되는 프로그램
// 2진수 뿐 아니라 16진수까지 동작하는 프로그램을 만든다.
// 파라미터로 진법 n, 미리 구할 숫자의 갯수 t, 게임에 참가하는 인원 m, 길동이의 순서 p 가 주어진다.

class Solution {
	constructor({ baseNum, amount, peopleNum, order }) {
		this.baseNum = baseNum;
		this.amount = amount;
		this.peopleNum = peopleNum;
		this.order = order;
		this.jinBubArray = [];
		this.init();
	}

	init() {
		this.jinBubArray = this.getAllNumbers(this.baseNum, this.amount, this.peopleNum);
	}

	getAllNumbers(baseNum, amount, peopleNum) {
		return Array.from({ length: amount * peopleNum }, (_, index) => index.toString(baseNum))
			.join('')
			.split('');
	}

	getPeopleArray(peopleNum) {
		return Array.from({ length: peopleNum }, (_, index) => String.fromCharCode(index + 65));
	}

	getResult(jinBubArr, peopleArr, peopleNum) {
		return jinBubArr.map((element, index) => {
			const key = `${peopleArr[index % peopleNum]}`;
			return { [key]: element };
		})
	}

	getOrderNum(result, peopleNum, order) {
		return result
			.filter((_, index) => index % peopleNum === order - 1)
			.map((element, index) => `${(index * peopleNum) + order}번째 ${JSON.stringify(element)}`);
	}

	run() {
		const result = this.getResult1();
		this.printResult1(result);
		this.printResult2(this.getOrderNum(result, this.peopleNum, this.order));
	}

	getResult1() {
		const peopleArray = this.getPeopleArray(this.peopleNum);
		return this.getResult(this.jinBubArray, peopleArray, this.peopleNum);
	}

	printResult1(result) {
		console.log(`문제 1번 : `);
		console.log(result);
	}
	printResult2(orderNum) {
		console.log(`문제 2번 : 길동이가 말해야 할 순서와 값`);
		orderNum.forEach(element => console.log(element))
	}
}

const test = new Solution({ baseNum: 2, amount: 4, peopleNum: 3, order: 2 });
test.run();

// const test2 = new Solution({ baseNum: 2, amount: 4, peopleNum: 2});
// test2.run();