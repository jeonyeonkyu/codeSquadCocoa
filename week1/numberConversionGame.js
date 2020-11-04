
class Solution {
    constructor() {

    }

    startGame(baseNum, amount, peopleNum, order) {
        const allNumArr = this.getAllNumbers(baseNum, amount, peopleNum);
        this.printResult1(allNumArr);
        this.printResult2(this.getOrderNum(allNumArr, peopleNum, order));
    }

    getAllNumbers(baseNum, amount, peopleNum) {
        let i = 0;
        const result = [];
        while (i < amount * peopleNum) {
            const applicableNum = i.toString(baseNum).split('');
            result.push(applicableNum);
            i++;
        }
        return result.join().split(',');
    }
    getOrderNum(numArr, peopleNum, order) {
        const gilDong = [];
        numArr.forEach((element, index) => {
            if (index % peopleNum === order - 1) {
                gilDong.push(`순서 : ${index + 1}번째 , 값 :  ${element}`);
            }
        });
        return gilDong;
    }
    printResult1(numArr) {
        console.log(`문제 1번 : ${JSON.stringify(numArr)}`);
    }
    printResult2(order) {
        console.log(`문제 2번 : 길동이가 말해야 할 순서와 값`);
        console.log(order);
    }
}

const test = new Solution();
test.startGame(2,4,2,2);

