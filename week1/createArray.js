//숫자타입으로만 구성된 요소를 뽑아 배열만들기
class CreateArray {
  constructor() {
    this.arr = [];
  }
  filteringNumberTypeToArr(obj) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        this.filteringNumberTypeToArr(obj[key]);
      } else {
        if (typeof obj[key] === 'number') {
          this.arr.push(key);
        }
      }
    });
    return this.arr;
  }
}






const data = {
  "debug": "on",
  "window": {
    "title": "Sample Konfabulator Widget",
    "name": "main_window",
    "width": 500,
    "height": 500
  },
  "image": {
    "src": "Images/Sun.png",
    "name": "sun1",
    "hOffset": 250,
    "vOffset": 250,
    "alignment": "center"
  },
  "text": {
    "data": "Click Here",
    "size": 36,
    "style": "bold",
    "name": "text1",
    "hOffset": 250,
    "vOffset": 100,
    "alignment": "center",
    "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
  }
}


const createArray = new CreateArray();
console.log(createArray.filteringNumberTypeToArr(data));