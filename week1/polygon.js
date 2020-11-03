
class Polygon {
	constructor() {
		this.executionSequence = [];
		this.area = {
			'circle': (...args) => this.getCircle(...args),
			'rect': (...args) => this.getRect(...args),
			'trapezoid': (...args) => this.getTrapezoid(...args)
		}
	}
	getCircle(radius, amount = radius) {
		let sum = 0;
		while (radius <= amount) {
			sum += Math.pow(radius, 2) * Math.PI;
			radius++;
		}
		this.addRecord('circle', sum);
	}

	getRect(length, height) {
		this.addRecord('rect', length * height);
	}

	getTrapezoid(upperSide, lowerSide, height) {
		this.addRecord('trapezoid', (upperSide + lowerSide) * height / 2);
	}

	getArea(name, ...args) {
		this.area[name](...args);
	}

	addRecord(shape, area) {
		console.log(`${shape} : ${area}`);
		this.executionSequence.push(`${shape} : ${area}`);
	}


	printExecutionSequence() {
		console.log('●●●●●●●●●●계산수행순서●●●●●●●●●●●');
		this.executionSequence.forEach((element, index) => console.log(`${index + 1}번째. ${element}`));
		console.log('●●●●●●●●●● 계산수행 끝 ●●●●●●●●●●●');
	}

};


let test = new Polygon();
test.getCircle(2);
test.getCircle(2, 4);
test.getArea('circle', 2);
test.getArea('rect', 2, 3);
test.getArea('trapezoid', 10, 15, 12);
test.printExecutionSequence();