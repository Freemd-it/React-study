# Redux Middleware



### 0. Redux / Redux Middleware의 이해

Redux를 제안하고 개발한 Dan Abramov는

"클라이언트 앱의 복잡성을 증가시키는 것은 **Mutation**과 **Asyncronicity** 이 2가지이며, 그 둘은 멘토스와 콜라와 같다"

라고 했는데, 여기서 Redux는 Mutation 즉, 클라이언트의 종합적인 state를 관리하기 위한 아키텍쳐 방법론이다.
<br>


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







###  2장. 비동기 작업을 처리하기 위한 미들웨어 사용해보기

 

