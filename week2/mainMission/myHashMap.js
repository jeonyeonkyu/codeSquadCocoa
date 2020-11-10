//해시맵처럼 동작하는 코드를 구현하기
//문자열 키와 문자열 값을 저장하는 해시맵 라이브러리를 구현한다.
// ES Classes를 활용한 방법으로 구현한다.
// 고유한 Hash 함수를 정한다.

class MyHashMap {
  constructor(index) {
    this.hashMap = Array.from({ length: index }, () => []);
    this.index = index;
    this.count = 0;
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
    const roomIndex = this.findRoomIndex(key);
    this.hashMap[this.getHashCode(key)].splice(roomIndex, 1);
  }

  containsKey(key) { // containsKey(String) 해당 키가 존재하는지 판단해서 Bool 결과를 리턴한다.
    const roomIndex = this.findRoomIndex(key);
    const result = roomIndex !== -1;
    return result;
  }

  get(key) { // get(String) 해당 키와 매치되는 값을 찾아서 리턴한다.
    const roomIndex = this.findRoomIndex(key);
    if (roomIndex !== -1) {
      this.hitPlus(roomIndex, key);
    }
    const result = roomIndex !== -1 ? this.hashMap[this.getHashCode(key)][roomIndex][key] : '해당 키가 존재하지 않음';
    return result;
  }

  isEmpty() { // isEmpty() 비어있는 맵인지 Bool 결과를 리턴한다.
    return this.hashMap.some((_, index) => {
      return !this.hashMap[index].length;
    });
  }

  keys() { // keys() 전체 키 목록을 [String] 배열로 리턴한다.
    return this.hashMap.flat().map(ele => Object.keys(ele)[0]);
  }

  replace(key, value) { // replace(String key, String value) 키-값으로 기존 값을 대체한다.
    const roomIndex = this.findRoomIndex(key);
    this.hashMap[this.getHashCode(key)][roomIndex] = { [key]: value, hit: 0 };
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

  findRoomIndex(key) { //중복되는 코드가 많아 해당키의 인덱스를 리턴하는 함수 추가
    const roomArray = this.hashMap[this.getHashCode(key)];
    return roomArray.findIndex((ele) => ele.hasOwnProperty(key));
  }

  //추가하고 싶은것 효율을 올리기위해 {hit : 0} 이라는 속성을 줘서 호출될 때마다 hit를 증가시키고 
  //많이 호출된 hashMap 객체를 10번마다 sort()해서 맨앞으로 정렬해보기 //물론 해시코드가 중복되어 충돌이 났을때 효과있음
  hitPlus(index, key) { //get할때마다 호출
    this.hashMap[this.getHashCode(key)][index]['hit']++;
    this.count++;
    if (this.count === 10) {
      this.hitCountSort();
    }
  }

  hitCountSort() { // get을 10번하여 hit가 10개가 쌓이면 실행 // 제일 많이 호출된 순서대로 정렬
    this.hashMap.forEach(ele => {
      ele.sort((a, b) => b.hit - a.hit)
    })
    this.count = 0;
  }
}

//메서드 테스트 및 hit수에따라 sort구현 테스트
let test = new MyHashMap(3);
console.log(test.isEmpty());
test.put('a', 4); test.put('b', 2); test.put('c', 1); test.put('d', 6); test.put('e', 7); test.put('q', 3); test.put('w', 3);
test.put('g', 1); test.put('r', 1);
test.get('w'); test.get('w'); test.get('w'); test.get('w'); test.get('w'); test.get('w'); test.get('w'); test.get('q'); test.get('q'); test.get('q');
test.get('a'); test.get('a'); test.get('a'); test.get('c'); test.get('c'); test.get('e'); test.get('q'); test.get('q'); test.get('q'); test.get('q');
test.get('q'); test.get('q'); test.get('q'); test.get('q'); test.get('q'); test.get('q'); test.get('q'); test.get('q'); test.get('q'); test.get('q');
console.log(test.hashMap);
console.log(test.keys());
test.replace('a', 10);
console.log(test.size());
console.log(test.get('a'));

test.clear();
console.log(test.isEmpty());
console.log(test.get('a'));
console.log(test.containsKey('a'));


