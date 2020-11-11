class dataRulesChecker {
  constructor() {
    this.depth = 1;
    this.depthLevel = [1];
    this.realArray = [];
  }

  run(str) {
    if (!this.bracketsCheck(str)) {
      return '올바른 대괄호가 아닙니다'; //오류에따라 다르게 출력되어야함
    }
    this.realArray = this.replaceStringIntoArray(str);
    this.printBasicInfo();
  }

  bracketsCheck(str) {  // 올바른 대괄호인지 체크하는 함수
    let openCount = 0;
    let closeCount = 0;
    for (let i = 0; i < str.length; i++) {
      if (closeCount > openCount) {
        return false;
      }
      switch (str[i]) {
        case '[':
          openCount++;
          break;
        case ']':
          closeCount++;
          break;
      }
    }
    if ((str[0] === "]") || (openCount !== closeCount)) {
      return false;
    };
    return true;
  }

  //내가 짠 코드 아님.. 아직 분석 필요, // [] 이런식으로 열고 바로 닫으면 0이라는 인자가 들어가는 것 수정필요
  replaceStringIntoArray(str) { // String으로 인자를 Array로 치환해주는 함수 
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
    let idx = 1;
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
console.log(test.run('[1,2,[3,4,[5,[6,[4]],[3]]],1]['));
console.log(test.realArray);

