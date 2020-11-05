- ### JavaScript set & map 에 대해서 알아보고 정리해보자.
---
# Map
 - 어떻게 사용하는것인가?

new Map() – 맵을 만듭니다.
map.set(key, value) – key를 이용해 value를 저장합니다.
map.get(key) – key에 해당하는 값을 반환합니다. key가 존재하지 않으면 undefined를 반환합니다.
map.has(key) – key가 존재하면 true, 존재하지 않으면 false를 반환합니다.
map.delete(key) – key에 해당하는 값을 삭제합니다.
map.clear() – 맵 안의 모든 요소를 제거합니다.
map.size – 요소의 개수를 반환합니다.
 * object/array와는 어떤 점이 다르지?

맵은 객체와 달리 키를 문자형으로 변환하지 않습니다. 키엔 자료형 제약이 없습니다.
 + 언제 유용하게 쓰일 수 있을까?

맵은 키로 객체를 허용합니다.
객체를 키로 사용할 수 있다는 점은 맵의 가장 중요한 기능 중 하나입니다. 객체에는 문자열 키를 사용할 수 있습니다. 하지만 객체 키는 사용할 수 없습니다.
맵은 삽입 순서를 기억합니다.
맵은 값이 삽입된 순서대로 순회를 실시합니다. 객체가 프로퍼티 순서를 기억하지 못하는 것과는 다릅니다.
size 프로퍼티 등의 유용한 메서드나 프로퍼티가 있습니다.
# Set
 - 어떻게 사용하는것인가?

셋(Set)은 중복을 허용하지 않는 값을 모아놓은 특별한 컬렉션입니다. 셋에 키가 없는 값이 저장됩니다.

주요 메서드는 다음과 같습니다.

new Set(iterable) – 셋을 만듭니다. 이터러블 객체를 전달받으면(대개 배열을 전달받음) 그 안의 값을 복사해 셋에 넣어줍니다.
set.add(value) – 값을 추가하고 셋 자신을 반환합니다.
set.delete(value) – 값을 제거합니다. 호출 시점에 셋 내에 값이 있어서 제거에 성공하면 true, 아니면 false를 반환합니다.
set.has(value) – 셋 내에 값이 존재하면 true, 아니면 false를 반환합니다.
set.clear() – 셋을 비웁니다.
set.size – 셋에 몇 개의 값이 있는지 세줍니다.
 * object/array와는 어떤 점이 다르지?

셋 내에 동일한 값(value)이 있다면 set.add(value)을 아무리 많이 호출하더라도 아무런 반응이 없을 겁니다. 셋 내의 값에 중복이 없는 이유가 바로 이 때문이죠.
 + 언제 유용하게 쓰일 수 있을까?

 중복을 허용하지 않는 값을 사용할 때
<br>
참고 [https://ko.javascript.info/map-set]
 
---
- ### higher order functions은 어떻게 메서드 체이닝이 가능할까? 그 이유를 알아보자.
---
  참고 [https://dev-momo.tistory.com/entry/HigherOrder-Function-%EC%9D%B4%EB%9E%80-%EB%AC%B4%EC%97%87%EC%9D%B8%EA%B0%80]
