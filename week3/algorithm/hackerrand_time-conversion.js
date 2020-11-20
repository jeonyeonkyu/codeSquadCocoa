// https://www.hackerrank.com/challenges/time-conversion/problem
'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    const res = [];
    const timeArr = s.split('');
    const ampm = timeArr.splice(8,2);
    let hour = timeArr.splice(0,2).join('');
    
    if(ampm[0] === 'P'){
        if(hour !== '12'){
            hour = Number(hour)+12 + '';
        }
    }else if(ampm[0] === 'A'){
        if(hour === '12'){
            hour = '00';
        }
    }
    timeArr.unshift(hour);
    return timeArr.join('');

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
