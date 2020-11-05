// Array 의 reduce 메서드처럼 동작하는 myReduce 메서드를 만들자.

// const myReduce = (arr, callback, initialValue) => {
//     //여기에 구현
// }
// const result = myReduce(arr, (next,prev) => {...}, []);

const myReduce = (arr, callback, initialValue = 0) => {
	if (!Array.isArray(arr)) {
		throw new Error('is not array');
	}
	let result = initialValue;
	for (let index = 0; index < arr.length; index++) {
		result = callback(acc = result, arr[index], index);
	}
	return result;
}
const a = [1, 2, 3];

const result1 = myReduce(a, (acc, cur, index) => acc + cur);
console.log(result1);

const result2 = myReduce(a, (acc, cur, index) => {
	acc.push(cur);
	return acc;
}, []);
console.log(result2);