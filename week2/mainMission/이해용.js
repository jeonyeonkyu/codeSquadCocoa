  //[6,[3,[4,[1]]]]
  //디버그 찍으면서 보기~
const func = (str) => {
  const parse = () => {
    const res = [];
    let num = 0;
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
console.log(func('[6,[3,[4,[1]]],1,3]'));