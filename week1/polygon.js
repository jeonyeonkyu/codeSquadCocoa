let order = '';
let printResult = '';

function printExecutionSequence() {
    console.log('계산수행순서 : ' + order.substring(2,order.length));
    console.log(printResult);
}

function getCircle(radius, amount) {
    if (amount === undefined) {
        const circleArea = Math.pow(radius, 2) * Math.PI;
        console.log('circleArea(원의넓이) = ' + circleArea);
        order+= ", circle";
        printResult += `circleArea(원의넓이) = ${circleArea} \n`;
    } else {
        if (radius <= amount) {
            let sum = 0;
            let circleAreaSum = 0;
            for (let i = radius; i <= amount; i++) {
                sum = Math.pow(i, 2) * Math.PI;
                circleAreaSum += sum;
            }
            console.log('circleAreaSum(원의넓의합) = ' + circleAreaSum);
            order+= ", circle";
            printResult += `circleAreaSum(원의넓의합) =  ${circleAreaSum} \n`;
        }else{
            console.log('원의 갯수를 잘못입력하셨습니다');
            order+= ", circle";
            printResult += '원의 갯수를 잘못 입력함 \n';
        }
    }

}
function getRect(length, height) {
    const rectArea = length * height;
    console.log('rectArea(사각형넓이) = ' + rectArea);
    order+= ", rect";
    printResult += `rectArea(사각형넓이) =  ${rectArea} \n`;
}
function getTrapezoid(upperSide, lowerSide, height) {
    const trapezoidArea = ((upperSide + lowerSide) * height) / 2;
    console.log('trapezoidArea(사다리꼴넓이) = ' + trapezoidArea);
    order+= ", trapezoid";
    printResult += `trapezoidArea(사다리꼴넓이) =  ${trapezoidArea} \n`;
}

function getArea(name, arg1, arg2, arg3) {

    switch (name) {
        case 'circle':
            getCircle(arg1, arg2);
            break;
        case 'rect':
            getRect(arg1, arg2);
            break;
        case 'trapezoid':
            getTrapezoid(arg1, arg2, arg3);
            break;

        default:
            console.log('잘못입력하셨습니다');
            
    }
}

getCircle(2);
getCircle(2,4);
getArea('circle',2);
getArea('rect',2,3);
getArea('trapezoid', 10,15,12);
printExecutionSequence() ;