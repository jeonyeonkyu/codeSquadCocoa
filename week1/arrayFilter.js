
//for/while문을 사용한 버전 만들기
const filterId_v1 = (peoples) => {
    const regExpSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const regExpNum = /[0-9]/g;
    const specialCharRemoveArr = [];

    for (let i = 0; i < peoples.length; i++) {
        if (regExpNum.test(peoples[i])) {
            peoples[i] = peoples[i].replace(regExpNum, '');
        }
        if (!regExpSpecial.test(peoples[i])) {
            specialCharRemoveArr.push(peoples[i]);
        }
    }
    return specialCharRemoveArr;
}

//forEach,filter, map등의 고차함수를 사용한 버전 만들기
const filterId_v2 = (peoples) => {
    const regExpSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
    const regExpNum = /[0-9]/g;
    const specialCharRemoveArr = [];

    return peoples.filter((element) => !regExpSpecial.test(element)).map((element) => element.replace(regExpNum,''));
}




const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v1(peoples));
const peoples2 = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v2(peoples2));

//for문을 사용하여 index에 접근한 filterId_v1()는 replace함수로 인해 peoples값이 변경 되었다.
console.log(peoples);
//filter와 map을 사용한 filterId_v2()는 index에 접근하지 않아 값이 그대로이다.
console.log(peoples2);
