class dataRulesChecker {
  constructor() {

  }

  bracketsCheck(str) {  // 올바른 대괄호인지 체크하는 함수
    let openCount = 0;
    let closeCount = 0;
    for (let i of str) {
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
    const checked = ((str[0] !== "]") || (openCount === closeCount));
    return checked;
  }
}



const test = new dataRulesChecker();
console.log(test.bracketsCheck('[[1] , [[12]], [1]]'))

