// type이 sk인, name으로 구성된 배열만 출력해본다.
const skNameO = require('./skNameO.js');

class ArrResultPrint {
	constructor() {
		this.arr = [];
	}
	nameIsSkFilterArr = (obj) => {
		Object.keys(obj).forEach((key) => {
			if (typeof obj[key] === 'object') {
				this.nameIsSkFilterArr(obj[key]);
			} else {
				if (obj[key] === 'sk') {
					this.arr.push(obj.name);
				}
			}
		});
		return this.arr;
	}
}

const result = new ArrResultPrint();
console.log(result.nameIsSkFilterArr(skNameO));