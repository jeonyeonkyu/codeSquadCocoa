class dataRulesChecker {
  constructor() {
    this.depth = 1;
    this.depthLevel = [1];
    this.realArray = [];
  }

  run(str) {
    if (!this.bracketsCountCheck(str)) {
      return '괄호 개수가 맞지 않습니다.';
    } else if (!this.bracketsStateCheck(str)) {
      return '괄호 형식이 맞지 않습니다';
    }
    this.realArray = this.replaceStringIntoArray(str);
    this.printBasicInfo();
  }


  bracketsCountCheck(str) {  // 괄호 갯수가 맞는지 체크하는 함수
    const strArr = str.split('');
    let openCount = 0;
    let closeCount = 0;
    strArr.forEach(ele => {
      if (ele === '[') {
        openCount++;
      } else if (ele === ']') {
        closeCount++;
      }
    })
    if ((openCount !== closeCount)) {
      return false;
    };
    return true;
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

  //내가 짠 코드 아님.. 아직 분석 필요, // [] 이런식으로 열고 바로 닫으면 0이라는 인자가 들어가는 것 수정필요
  replaceStringIntoArray(str) { // String으로 인자를 Array로 치환해주는 함수 
    let idx = 1;
    const parse = () => {
      const res = [];
      let num = 0;
      let flag = true;
      while (idx < str.length) {
        const char = str[idx++];
        switch (char) {
          case '[':
            flag = false;
            this.depth++;
            this.depthLevel.push(this.depth);
            res.push(parse());
            break;
          case ']':
            if (flag) {
              this.depth--;
              res.push(num);
            }
            return res;
          case ',':
            if (flag) {
              res.push(num);
              num = 0;
            }
            break;
          default:
            flag = true;
            num = num * 10 + Number(char);
        }
      }
      return res;
    }
    return parse();
  }

  printBasicInfo() {
    console.log(`깊이 수준은 ${Math.max(...this.depthLevel)}이며,
     총 ${this.realArray.flat(Infinity).length}개의 원소가 포함되어 있습니다`);
  }

  printDetailInfo() {

  }
}





const test = new dataRulesChecker();
test.run('[1,2,[3,4,[5,[6,[4]],[3]]],1]');
console.log(test.run('][[1,2,[3,4,[5,[6,[4]],[3]]],1]'));
console.log(test.realArray);
test.run('[1,2,[3]]');

