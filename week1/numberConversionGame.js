const solution = (baseNum, amount, peopleNum, gildongOrder) => {
    let i = 0;
    const result = [];
    while (i.toString(baseNum).length < amount) {
        const applicableNum = i.toString(2).split('');
        result.push(applicableNum);
        i++;
    }
    const printResult = result.join().split(',');
    console.log(`문제 1번 : ${JSON.stringify(printResult)}`);

    let gildong = [];
    printResult.forEach((element,index) =>{
        if(index % peopleNum === gildongOrder-1){
            gildong.push(`순서 : ${index}번째 , 값 :  ${element} \n`);
        }
    });

    console.log(`문제 2번 : 길동이 ${gildong}`);
};

solution(2, 4, 3, 3);
