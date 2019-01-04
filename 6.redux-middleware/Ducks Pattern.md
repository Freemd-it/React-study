# Ducks pattern

Redux를 사용하는 어플리케이션을 구축하다 보면 기능별로 여러 개의 액션 타입과, 액션, 리듀서 한 세트를 만들어야 한다. 이들은 관습적으로 여러 개의 폴더로 나누어져서, 하나의 기능을 수정할 때는 이 기능과 관련된 여러 개의 파일을 수정해야 하는 일이 생긴다. 여기서 불편함을 느껴 나온 것이 [Ducks 구조](https://github.com/JisuPark/ducks-modular-redux)이다.





### Ducks구조 예시

```react
// widgets.js

// Actions
const LOAD   = 'my-app/widgets/LOAD';
const CREATE = 'my-app/widgets/CREATE';
const UPDATE = 'my-app/widgets/UPDATE';
const REMOVE = 'my-app/widgets/REMOVE';

// Reducer
export default function reducer(state = {}, action = {}) {
  switch (action.type) {
    // do reducer stuff
    default: return state;
  }
}

// Action Creators
export function loadWidgets() {
  return { type: LOAD };
}

export function createWidget(widget) {
  return { type: CREATE, widget };
}

export function updateWidget(widget) {
  return { type: UPDATE, widget };
}

export function removeWidget(widget) {
  return { type: REMOVE, widget };
}
```

1. 최상단에 action type 정의
2. 리듀서는 `export default` 로 내보냄
3. action 생성자는 `export` 를 통하여 내보냄
4. 액션타입 작성시
   `npm-module-or-app/reducer/ACTION_TYPE` 의 형식으로 작성해야한다.
   만일, npm 모듈을 작성하는 경우가 아니라면 `reducer/ACTION_TYPE` 형식으로 작성가능.
   (서로 다른 리듀서에서 같은 이름의 action type의 충돌을 방지하기 위한 것)



### redux-actions 를 통한 더 쉬운 액션관리

1) createAction 을 통한 액션생성 자동화

```react
export const increment = (index) => ({
    type: types.INCREMENT,
    index
});

export const decrement = (index) => ({
    type: types.DECREMENT,
    index
});
```

이전의 액션 생성자는 위와같이 전달받은 파라미터를 동일 형식의 객체로 작성하여 반환해주는 작업입니다.

따라서 이러한 작업은 충분히 자동화가 가능한데, 이러한 자동화를 도와주는 친구가  `createAction` 입니다.

```react
export const increment = createAction(types.INCREMENT);
export const decrement = createAction(types.DECREMENT);
```

하지만 이러한 방식으로는 그 파라미터 값을 index로 전달해줄 수 있을지 알 수 없습니다. 

따라서, 파라미터로 전달받을 값을 액션의 `payload` 값으로 설정해줍니다.



### switch 문 대신 handleActions 사용하기

리듀서에서 액션의 type 에 따라 다른 작업을 하기 위해서  `switch`문을 사용했는데, 이러한 방식은 큰 결점이 있습니다.

 `scope`가 리듀서 함수로 설정되어 서로 다른 `case` 에서 `let` 이나 `const` 를 통하여 변수를 선언하려고 하다보면 같은 이름이 중첩될시엔 에러가 발생할 수 있다는 것 입니다.

그렇다고해서 각 `case` 마다 함수를 정의하는건 코드를 읽기 힘들어질것이구요..

이 문제를 해결해주는것이 바로 `handleActions` 입니다. 이 함수를 사용하면 다음과 같은 방식으로 해결 할 수 있습니다.

```react
const reducer = handleActions({
  INCREMENT: (state, action) => ({
    counter: state.counter + action.payload
  }),

  DECREMENT: (state, action) => ({
    counter: state.counter - action.payload
  })
}, { counter: 0 });
```

 첫번째 파라미터로는 액션에 따라 실행 할 함수들을 가지고있는 객체, 두번째 파라미터로는 상태의 기본 값 (initialState) 를 넣어주면 됩니다.