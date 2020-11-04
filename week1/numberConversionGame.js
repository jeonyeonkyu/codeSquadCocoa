
const solution = (baseNum, amount, peopleNum, order) => {

    const allNumArr = getAllNumbers(baseNum, amount, peopleNum);
    printResult1(allNumArr);
    printResult2(getOrderNum(allNumArr, peopleNum, order));
    
};


const getAllNumbers = (baseNum, amount, peopleNum) => {
    let i = 0;
    const result = [];
    while (i < amount * peopleNum) {
        const applicableNum = i.toString(baseNum).split('');
        result.push(applicableNum);
        i++;
    }
    return result.join().split(',');
}

const getOrderNum = (numArr, peopleNum, order) => {
    const gilDong = [];
    numArr.forEach((element, index) => {
        if (index % peopleNum === order - 1) {
            gilDong.push(`순서 : ${index + 1}번째 , 값 :  ${element}`);
        }
    });
    return gilDong;
}

const printResult1 = (numArr) => {
    console.log(`문제 1번 : ${JSON.stringify(numArr)}`);
}

const printResult2 = (order) => {
    console.log(`문제 2번 : 길동이가 말해야 할 순서와 값`)
    console.log(order);
}


solution(2, 4, 2, 2);
