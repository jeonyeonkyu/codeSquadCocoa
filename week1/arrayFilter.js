const regExpSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
const regExpNum = /[0-9]/g;

//for/while문을 사용한 버전 만들기
const filterId_v1 = (people) => {
  const specialCharRemoveArr = [];
  let result = '';
  for (let i = 0; i < people.length; i++) {
    if (!regExpSpecial.test(people[i])) {
      result = regExpNum.test(people[i]) ? people[i].replace(regExpNum, '') : people[i];
      specialCharRemoveArr.push(result);
    }
  }
  return specialCharRemoveArr;
}

//forEach,filter, map등의 고차함수를 사용한 버전 만들기
const filterId_v2 = (people) => {
  return people
    .filter((element) => !regExpSpecial.test(element))
    .map((element) => element.replace(regExpNum, ''));
}


const people = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v1(people));
const people2 = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v2(people2));

