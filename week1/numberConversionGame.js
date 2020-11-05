
class Solution {
    constructor({ baseNum, amount, peopleNum, order }) {
        this.baseNum = baseNum;
        this.amount = amount;
        this.peopleNum = peopleNum;
        this.order = order;
        this.jinBubArray = [];
        this.peopleArray = [];
        this.result = [];
        this.orderNum = [];
        this.init();

    }

    init() {
        this.jinBubArray = this.getAllNumbers(this.baseNum, this.amount, this.peopleNum);
        this.peopleArray = this.getPeopleArray(this.peopleNum);
        this.result = this.getResult(this.jinBubArray, this.peopleArray, this.peopleNum);
        this.orderNum = this.getOrderNum(this.result, this.peopleNum, this.order);
    }

    getAllNumbers(baseNum, amount, peopleNum) {
        return Array.from({ length: amount * peopleNum }, (_, index) => index.toString(baseNum)).join('').split('');
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
        return result.filter((_, index) => index % peopleNum === order - 1).map((element, index) =>
            `${(index * peopleNum) + order}번째 ${JSON.stringify(element)}`);
    }

    run() {
        this.printResult1();
        this.printResult2();
    }

    printResult1() {
        console.log(`문제 1번 : `);
        console.log(this.result);
    }
    printResult2() {
        console.log(`문제 2번 : 길동이가 말해야 할 순서와 값`);
        console.log(this.orderNum);
    }
}

const test = new Solution({ baseNum: 2, amount: 4, peopleNum: 3, order: 2 });
test.run();

// const test2 = new Solution({ baseNum: 2, amount: 4, peopleNum: 2});
// test2.run();