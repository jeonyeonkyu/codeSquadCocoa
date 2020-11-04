
const factorial = (num) => {
    const result = [];
    let sum = 1;
    for(let i = 1; i<=num; i++){
        result.push(i*sum);
        sum *= i;
    }
    return result;
}

console.log(factorial(4));