//해시맵처럼 동작하는 코드를 구현하기
//문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.
// ES Classes를 활용한 방법으로 구현한다.
// 고유한 Hash 함수를 정한다.

class MyHashMap {
  constructor(index) {
    this.hashMap = Array.from({ length: index }, () => []);
    this.index = index;
  }

  getHashCode(key) { // 아스키코드값으로 hashCode 만들어서 배열 방의 크기만큼 나눈값을 리턴
    const hashCode = key.split('')
      .map((ele) => ele.charCodeAt(0))
      .reduce((acc, cur) => acc + cur, 0);
    return hashCode % this.index;
  }

  put(key, value) { //put(String key, String value) 키-값을 추가한다.
    if (this.containsKey(key)) {
      this.replace(key, value);
    } else {
      this.hashMap[this.getHashCode(key)].push({ [key]: value, hit: 0 });
    }
  }

  remove(key) { // remove(String key) 해당 키에 있는 값을 삭제한다.
    const index = this.findIndex(key);
    this.hashMap[this.getHashCode(key)].splice(index, 1);
  }

  containsKey(key) { // containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
    const index = this.findIndex(key);
    const result = index !== false ? true : false;
    return result;
  }

  get(key) { // get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
    const index = this.findIndex(key);
    const result = index !== false ? this.hashMap[this.getHashCode(key)][index][key] : '해당 키가 존재하지 않음';
    return result;
  }

  isEmpty() { // isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
    return this.hashMap.some((_, index) => {
      return !this.hashMap[index].length;
    });
  }

  keys() { // keys() 전체 키 목록을 [String] 배열로 리턴한다.
    const result = [];
    for (let i = 0; i < this.index; i++) {
      for (let j = 0; j < this.hashMap[i].length; j++) {
        result.push(Object.keys(this.hashMap[i][j]).toString());
      }
    }
    return result;
  }

  replace(key, value) { // replace(String key, String value) 키-값으로 기존 값을 대체한다.
    const index = this.findIndex(key);
    this.hashMap[this.getHashCode(key)][index] = { [key]: value, hit: 0 };
  }
  
  size() { // size() 전체 아이템 개수를 리턴한다.
    let size = 0;
    this.hashMap.forEach((_, i) => {
      size += this.hashMap[i].length;
    })
    return size;
  }

  clear() { // clear() 전체 맵을 초기화한다.
    this.hashMap = Array.from({ length: this.index }, () => []);
  }
  
  findIndex(key) { //중복되는 코드가 많아 해당키의 인덱스를 리턴하는 함수 추가
    const mapIndex = this.hashMap[this.getHashCode(key)];
    for (let i = 0; i < mapIndex.length; i++) {
      if (mapIndex[i].hasOwnProperty(key)) {
        return i;
      }
    }
    return false;
  }

  //추가하고 싶은것 효율을 올리기위해 {hit : 0} 이라는 속성을 줘서 호출될 때마다 hit를 증가시키고 
  //많이 호출된 hashMap 객체를 10번마다 sort()해서 맨앞으로 정렬해보기
  hitPlus(key) {

  }
}

let test = new MyHashMap(3);
console.log(test.isEmpty());
test.put('b', 3);
test.put('4', 5);
console.log(test.keys());
test.clear();
console.log(test.size());
test.put('i', 333);
test.put('i', 77777);
test.put('q', 33);
test.put('d', 33);
test.put('7', 33);
test.put('1', 33);
test.put('2', 33);
test.put('3', 33);
test.put('4', 33);
console.log(test.size());
test.put('gg', 0);
console.log(test.size());
console.log(test.isEmpty());
console.log(test.get('3'));
test.replace('i', 'dddd');
console.log(test.keys());
console.log('-------')
console.log(test.get('i'));
console.log(test.isEmpty());
console.log(test.containsKey('i'));
test.remove('i');
console.log(test.containsKey('i'));

