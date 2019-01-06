# Redux Middleware



### 0. Redux / Redux Middleware의 이해

Redux를 제안하고 개발한 Dan Abramov는

"클라이언트 앱의 복잡성을 증가시키는 것은 **Mutation**과 **Asyncronicity** 이 2가지이며, 그 둘은 멘토스와 콜라와 같다"

라고 했는데, 여기서 Redux는 Mutation 즉, 클라이언트의 종합적인 state를 관리하기 위한 아키텍쳐 방법론이다.



#### 1) Redux의 원리

어플리케이션 전체에는 store라는 커다란 **하나의** state가 존재하는데 이것이 어플리케이션의 state를 총괄한다.

이 store의 state는 그 자체를 직접 변형할 수 없고, 오직 **순수 함수**인 리듀서로만 새로운 형태로 갈아치우는 것이 가능하다.

 리듀서는 type과 payloads(꼭 속성이름이 이렇지 않아도 됨)를 속성으로 갖는 **단순 객체인** `action`이벤트가 발생했을 때에만 작동하며,

`action`이벤트를 발생시키는 방법은 dispatch라는 함수에 단순 객체인 action을 넣는것으로 가능하게 한다.

이를 시간 순으로 정리하면,

>dispatch(action) => 리듀서 작동 => store의 state변경 
>
>=> 변경된 state가 state를 subscribe하고 있는 컴포넌트에 전달

위와 같다.

그렇다면, Redux를 통한 상태관리의 장점은 무엇일까?

1. application의 state의 변화가 예측 가능하다.

   = 특정 액션에만 리듀서가 작동하므로, store state가 변하면, `어떠한 액션으로부터 변경된 것인지` 알 수 있다.

2. 어떠한 이벤트로부터 변경된 것인지 알 수 있으므로, `Time travel debugging`이 가능하다.

3. 리듀서가 **순수 함수**(외부에 영향을 끼치지 않는 함수. ex: api calling이 없는 함수)이기 때문에 test코드를 짤 수 있다

4. 선언적으로 프로그래밍(Declarative Programming)을 할 수 있다 

   

#### 2) Redux Middleware의 필요성

멘토스인 Mutation은 Redux를 통하여 해결이 가능하다고하면, 콜라인 **Asyncronicity**는 어떻게 되는 것일까,,?

Redux에서 action은 **단순객체**이기 때문에, 조건 분기 혹은 action내에서 또다른 action을 발생시키는 것과 같은 작업을 할 수 없다.

예를 들면,

```
1. 로그인 요청을 보내며 로딩중이라는 표시를 뜨게 하기
2. 회원가입 요청을 보내는데에 만약 이미 있는 id라면 에러 메세지를 보내고 아니라면 성공시킨다.
```

위와 같은 행동은 불가능하다는 것이다.

그렇기에 우리는 redux middleware를 사용한다. `action creator`라는 action을 생성하는 함수를 정의하면, 조건의 분기 뿐만 아니라,  Promise 혹은 Callback을 조화하여 비동기적 작업이 가능해진다.









###  1. 미들웨어(Middleware) 란? 

`미들웨어 = 양 쪽을 연결하여 데이터를 주고받을 수 있도록 중간에서 매개 역할을 하는 소프트웨어`

![middleware](./redux-middleware.png)

리액트에서 미들웨어는, 액션이 디스패치(dispatch) 되어서 리듀서에서 이를 처리하기전에 사전에 지정된 작업들을 설정한다.

리듀서가 액션을 처리하기전에, 미들웨어에서는, 단순히 전달받은 액션을 콘솔에 기록을 할 수도 있고, 전달받은 액션에 기반하여

액션을 아예 취소시켜버리거나, 다른 종류의 액션들을 추가적으로 디스패치하는 등 다양한 작업이 가능하다.

#### [1-2. 미들웨어 만들기](https://redux-advanced.vlpt.us/1/02.html)

실제 프로젝트 작업 시에는, 미들웨어를 직접 만들어 사용하기보단 이미 잘 만들어져있는 미들웨어를 가져다 쓰는 경우가 대부분이지만, 미들웨어의 이해를 위하여 로깅을 위한 간단한 Logger Middleware를 작성해보겠습니다.

```bash
$ git clone https://github.com/vlpt-playground/redux-starter-kit.git
$ cd redux-starter-kit
$ yarn
```



> ##### `next(action)`
>
> store.dispatch를 실행할 경우, 액션을 처음부터 다시 디스패치하는 것이므로 현재의 미들웨어부터 다시 실행하게 된다.
>
> next(action)은 이와 달리 리듀서로 넘겨주거나, 미들웨어가 더 존재한다면 다음 미들웨어로 넘겨줍니다.
>
> ![next(action)](next-vs-dispatch.png)







###  [2장. 비동기 작업을 처리하기 위한 미들웨어 사용해보기](https://redux-advanced.vlpt.us/2/)

####  2-1 [redux-thunk](https://github.com/reduxjs/redux-thunk)

리덕스를 사용하는 어플리케이션에서 비동기 작업을 처리 할 때 가장 기본적인 방법은  `redux-thunk` 라는 미들웨어를 사용하는것입니다. ([redux 공식 매뉴얼](https://lunit.gitbook.io/redux-in-korean/api/applymiddleware#using-thunk-middleware-for-async-actions)에서도 이 미들웨어를 사용하여 비동기작업을 다룹니다.)



#### thunk 란?

thunk란, 특정 작업을 나중에하도록 미루기 위하여 함수 형태로 작업단위를 감싼 것을 말합니다.

```javascript
const x = 1 + 2;

const foo = () => 1 + 2;
```



#### 왜 사용해야하는가?

단순 객체만 생성하는 기존의 액선 생성자와 달리, 

redux-thunk를 활용하면 함수를 생성하는 액션 생성자를 작성할 수 있게 됩니다.

 따라서, 아래와 같이 액션의 디스패치를 지연시키거나, 특정 조건이 만족된 경우에만 디스패치할 수 있습니다!

내부 함수에서는 매개변수로 dispatch와 getState를 받습니다.

```javascript
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
  return {
    type: INCREMENT_COUNTER
  };
}

//액션의 디스패치를 1초 지연시킴
function incrementAsync() {
  return dispatch => {
    setTimeout(() => {
      // Yay! Can invoke sync or async actions with `dispatch`
      dispatch(increment());
    }, 1000);
  };
}
```



```javascript
//(counter가 홀수)특정 조건에서만 액션을 디스패치
function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
}
```





#### 2-2 Redux-saga

위에서 다룬 Redux-thunk는 간단하게 비동기 작업을 처리할 수 있다는 장점이 있지만 단점또한 존재한다.

액션을 생성하는 함수에서 action을 디스패치하는 것 뿐만 아니라 비동기작업을 위한 코드나 api요청, 기타 로직들이 더해지면서

action 본래의 역할이 더럽혀진다는 것이다.

이러한 단점을 보완하기 위해 많은 사람들이 `Redux-saga` 로 넘어간다고 합니다.



[왜 리덕스 사가인가?](https://gracefullight.github.io/2017/12/06/Why-redux-saga/)

[Redux-saga의 흐름](http://takeuu.tistory.com/259)

[벨로퍼트 - 리덕스사가](https://redux-advanced.vlpt.us/2/05.html)