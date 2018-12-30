# immutable



> ### 불편한점 -> 사용 이유

리덕스를 사용하여 멀티 카운터를 만들 시 , 

1. 액션을 만들때 마다 세가지 파일 (액션타입, 액션 생성 함수, 리듀서)를 수정해야 한다는 점
2. 전개 연산자, slice함수로 배열 내부의 원소를 수정하는데 가독성이 낮음



> ### immutable.js

자바스크립트에서 불변성 데이터를 다룰 수 있도록 도와줌 



> ### 객체 불변성



```js
let a = 7;
let b = 7;

let object1 = {a:1, b:2};
let object2 = {a:1, b:2};

let object3 = object1



console.log(a === b); // true
console.log(object1 === object2) // false 서로 다른 객체로 인식 -> 원시타입
console.log(object1 === object3) // true 같은 객체를 가르킨다 -> 참조타입

```



```js
let object1 = {a:1, b:2};
let object2 = {a:1, b:2};

let object3 = object1


object3.c=3;


console.log(object1 === object3) // true
console.log(object1) // {a:1, b:2, c:3} // 같은 객체를 바라보고 있기 때문, object 3에 데이터 추가시 object1의 값도 같이 변경

```



이렇듯, 리액트 컴포넌트에서 state 또는 상위 컴포넌트에서 전달받은 props값이 변할때 리레더링 되는데 

배열, 객체를 직접 수정한다면 내부 값을 수정했을지라도 레퍼런스가 가리키는 곳은 같기 때문에 똑같은 값으로 인식 



-> 여러 층으로 구성된 배열, 객체를 업데이트를 해야 할때, 전개 연산자를 사용해서 기존값을 가진 새 객체, 배열을 생성하고 업데이트를 하는 거였음!



but. 간단한 변경에도 코드가 복잡해질 우려가 ;;;

```js
let object1 = {
    a:1,
    b:2,
    c:3,
    d:{
        e:4,
        f:{
            g:5,
            h:6
        }
    }
};
```



immutable.js 사용 하지 않을 시

```js
// h 를 10으로 업데이트를 하기위한 전개 연산자
let object2 = {
	object1,
    d:{
        ...object.d
        f:{
         ...object.d.f,
        	h: 10
        }
    }
};
```



immutable.js사용 할 시,

```js
let object1 = Map({
    a: 1,
    b: 2,
    c: 3,
    d: Map({
        e: 4,
        f: Map({ 
            g: 5,
            h: 6
        })
    })
});

let object2 = object1.setIn(['d', 'f', 'h'], 10);

object1 === object2;
// false
```



# immutable 사용할 규칙

1. 객체는 Map
2. 배열은 List
3. 설정할땐 set
4. 읽을땐 get
5. 읽은다음에 설정 할 땐 update
6. 내부에 있는걸 ~ 할땐 뒤에 In 을 붙인다: setIn, getIn, updateIn
7. 일반 자바스크립트 객체로 변환 할 땐 toJS
8. List 엔 배열 내장함수와 비슷한 함수들이 있다 - push, slice, filter, sort, concat... 전부 불변함을 유지함
9. 특정 key 를 지울때 (혹은 List 에서 원소를 지울 때) delete 사용



# Map



> ### Map

객체 대신 사용하는 데이터 구조 

일반적인 자바스크립트에 내장된 Map과는 다름





```js
const {Map, fromJS} = Immutable;

const data3 = fromJS({
  a:1,
  b:2,
  c: {
    d:3,
    e:4,
    f:5
  }
});

console.log(data3);

```



data 내부의 값 a을 참조하고 싶다면 data.get('a')를 해야한다. 







# 사용방법



> ### 자바스크립트 객체로 변환

```js
const deserialized = data.toJS();
console.log(deserialized);
// {a :1, b:2, c: { d:3, e:4, f:5 }}
```



> ### 특정 키의 값 불러오기

```js
data.get('a'); // 1
```





> ### 깊숙이 위치한 값 불러오기

```js
data.getIn(['c', 'd']) // 3
```





> ### 값 설정

주어진 변화를 적용한 새 Map를 만드는 것

```js
const newData = data.set('a', 4);

console.log(data === newData); // false -> 원시타입
```



> ### 깊숙이 위치한 값 수정

```js
const newData = data.setIn(['c', 'd'], 10);
```





> ### 여러값 동시 설정

f 값을 건들지 않고, d, e만 변경

```js
const newData = data.mergeIn(['c'], {d: 10, e: 10});
```



```js
const newData = data.setIn(['c','d'], 10)
					.setIn(['c','e'], 10);
```



성능상 set >> merge가 좋아, set을 여러번 사용하는 것이 빠름

실제로도 사용시 set 을 많이 사용 (0.0)





# List

immutable 데이터 구조로 주로 배열에 사용

자바스크립트 배열 메소드(내장함수) map, filter, sort, push pop 사용 가능 

메소드를 실행 시, List를 변경하는 것이 아닌 새로운 List를 반환 



리액트 컴포넌트는 List 데이터 구조와 호환되기 때문, 

map함수를 사용하여 데이터가 들어있는 List를 컴포넌트 List로 변환 -> 렌더가능



```js
const {List, Map, fromJS } = Immutable;

const list = List([
    Map({value : 1}),
    Map({value : 2}),
])

or 

const list = fromJS([
    {value: 1},
    {value: 2},
])
```

fromJS를 사용 시,  내부 배열은 List, 내부 객체는 Map으로 사용



```
console.log(list.toJS()); // 자바스크립트 일반배열로 변환 가능
```



> ### 값 읽어오기

```js
list.get(0); // 0번째 값 읽어온다. 
```



```js
list.getIn([0, value]); // 0번째 value값을 읽어온다. 
```





> ### 수정하기

```js
const newList = list.set(0, Map({
    value : 10
}));
// 0번째 Map 아이템을 통째로 바꾸기 
```



```js
const newList = list.setIn([0, 'value'], 10);
// 0번째 Map 내부의 값 변경
```



```js
const newList = list.update(0, item => item.set('value', item.get('value') * 5));
// 첫번째 파라미터 : 선택할 인덱스 값
// 두번째 파라미터 : 선택한 원소를 업데이트
```



```js
const newList = list.setIn([0, 'value'], list.getIn([0,'value'] * 5));
```





> ### 추가하기 



```js
const newList = list.push(Map({value : 3}));
// Array러럼 기존 List에 추가하는 것이 아님, 새 List를 만들어서 반환 -> 참조타입
```



```js
const newList = list.unshift(Map({value : 0}));
// 맨 앞에 데이터 추가
```



> ### 아이템 제거

```js
const newList = list.delete();
```

```js
const newList = list.pop();
// 마지막 아이템 제거 
```





> ### List size가져오기

```js
console.log(list.size);
```

```js
list.isEmpty(); 
// 비어있는 지 여부 파악
```





Immutable에서 가장 많이 사용하는 데이터 구조인 Map, List !!!

이 두가지만 알아도 리덕스를 사용하는데 문제가 없음,





