const regExpSpecial = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
const regExpNum = /[0-9]/g;

//for/while문을 사용한 버전 만들기
const filterId_v1 = (peoples) => {
    const specialCharRemoveArr = [];
    let result = '';
    for (let i = 0; i < peoples.length; i++) {
        if (!regExpSpecial.test(peoples[i])) {
            if (regExpNum.test(peoples[i])) {
                result = peoples[i].replace(regExpNum, '');
            } else {
                result = peoples[i];
            }
            specialCharRemoveArr.push(result);
        }
    }
    return specialCharRemoveArr;
}

//forEach,filter, map등의 고차함수를 사용한 버전 만들기
const filterId_v2 = (peoples) => {
    return peoples.filter((element) => !regExpSpecial.test(element)).map((element) => element.replace(regExpNum, ''));
}


const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v1(peoples));
const peoples2 = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v2(peoples2));

