// Array 의 reduce 메서드처럼 동작하는 myReduce 메서드를 만들자.

// const myReduce = (arr, callback, initialValue) => {
//     //여기에 구현
// }
// const result = myReduce(arr, (next,prev) => {...}, []);

const myReduce = (arr, callback, initialValue) => {
	if (!Array.isArray(arr)) {
		throw new Error('is not array');
	}
	let arrIndex = 0;
	if (initialValue === undefined) {
		initialValue = arr[0];
		arrIndex = 1;
	}
	let accumulator = initialValue;
	for (let index = arrIndex; index < arr.length; index++) {
		accumulator = callback(accumulator, arr[index], index);

	}
	return accumulator;
}

//비교하는 구문
const a = [4, 2, 6, 1];
const result1 = myReduce(a, (acc, cur) => acc + cur, 4);
console.log('----------------------')
console.log(result1);
console.log('----------------------')
console.log(a.reduce((acc, cur) => acc + cur, 4));

const result2 = myReduce(a, (acc, cur) => {
	acc.push(cur);
	return acc;
}, []);
console.log(result2);
console.log(a.reduce((acc, cur) => {
	acc.push(cur);
	return acc;
}, []))