

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


const peoples = ["crong!@#", "honux5", "sarah#", "hea3d", "zello", "5lucas"];
console.log(filterId_v1(peoples));