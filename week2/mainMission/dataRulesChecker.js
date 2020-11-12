class dataRulesChecker {
  constructor() { }

  run(str) {
    if (!this.bracketsCountCheck(str)) {
      console.log('괄호 개수가 맞지 않습니다.');
      return;
    } else if (!this.bracketsStateCheck(str)) {
      console.log('괄호 형식이 맞지 않습니다');
      return;
    }
    this.printBasicInfo(this.getMaxDepthLevel(str), this.replaceStringIntoArray(str));
    this.printDetailInfo(this.replaceStringIntoArray(str));
  }

  getMaxDepthLevel(str) { // 깊이수준 구하는 함수
    let depthLevel = 0;
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === '[') {
        count++;
      } else if (str[i] === ']') {
        count--;
      }
      if (depthLevel < count) {
        depthLevel++;
      }
    }
    return depthLevel;
  }

  bracketsCountCheck(str) {  // 괄호 갯수가 맞는지 체크하는 함수
    const openCount = str.match(/\[/g).length;
    const closeCount = str.match(/\]/g).length;
    return openCount === closeCount;
  }

  bracketsStateCheck(str) { // 괄호형식이 맞는지 체크하는 함수
    let openCount = 0;
    let closeCount = 0;
    for (let i = 0; i < str.length; i++) {
      switch (str[i]) {
        case '[':
          openCount++;
          break;
        case ']':
          closeCount++;
          break;
      }
      if (closeCount > openCount) {
        return false;
      }
    }
    return true;
  }

  replaceStringIntoArray(str) { // String으로 받은 인자를 Array로 치환해주는 함수 
    let idx = 1;
    const parse = () => {
      const res = [];
      let val = '';
      let flag = true;
      while (idx < str.length) {
        const char = str[idx++];
        switch (char) {
          case '[':
            flag = false;
            res.push(parse());
            break;
          case ']':
            if (flag) {
              if (val === '') {
                res.length++; //빈 배열( [] ) or 빈원소(,,,,) 이 들어갔을때 <1 empty item> 추가하기
                return res;
              }
              res.push(val);
            }
            return res;
          case ',':
            if (val === '') {
              res.length++;
            } else {
              res.push(val);
              val = '';
            }
            break;
          default:
            flag = true;
            val = val * 10 + Number(char);
        }
      }
      return res;
    }
    return parse();
  }


  constructObj(arr) {
    const parse = (divisionArr) => {
      const res = [];
      let obj;
      for (let i = 0; i < divisionArr.length; i++) {
        const char = divisionArr[i];
        if (typeof char === 'number') {
          obj = {
            type: 'number',
            value: char,
            child: []
          }
        } else if (Array.isArray(char)) {
          obj = {
            type: 'array',
            child: parse(char)
          }
        } else if (typeof char === 'undefined') {
          obj = {
            type: 'undefined',
            child: []
          }
        }
        res.push(obj);
      }
      return res;
    }

    return {
      type: "root",
      child: [
        {
          type: "array",
          child: parse(arr)
        }
      ]
    }
  }

  printBasicInfo(maxDepthLevel, realArray) { //기본정보 출력
    console.log(`깊이 수준은 ${maxDepthLevel}이며, 총 ${realArray.flat(Infinity).length}개의 원소가 포함되어 있습니다`);

  }

  printDetailInfo(arr) { //상세정보 출력
    console.dir(this.constructObj(arr), { depth: null });
  }
}

//테스트
const test = new dataRulesChecker();
test.run('][1,[3,[41][]]')  //형식에 맞지않는 것 테스트
test.run('[1,2,[3,4,[5,[6]]]]');
test.run('[11,2444,[3,41,[5,[64]]],71,[],,,]'); // undefined 출력 테스트
console.log(test.replaceStringIntoArray('[11,2444,[3,41,[5,[64]]],71,[],,,]')); // <empty items> 출력 확인용 테스트

