# React-study
freemed-react-study

## 1.React 컴포넌트  
- 컴포넌트?
    ```
        const ex = (<div>컴포넌트<div>);
    ```
- 컴포넌트는 반드시 하나의 Element만 리턴해야한다.(아래와 같은 코드 작성불가)
    ```
        const ex = (
            <div>1번<div>
            <div>2번<div>
        );
    ```
- 만약, 여러개의 컴포넌트를 Return 하고싶을때에는 다른태그로 한번 감싸주거나, 혹은 [Fragment](https://reactjs.org/docs/fragments.html#keyed-fragments)를 사용하도록 한다.
- 각각의 컴포넌트는 독립적으로 작동.
- 함수형컴포넌트
    - props만 받아서 사용이 가능하다.(state사용 불가능)
    - life-cycle 이없다
    - 클래스형 컴포넌트에 비교하여 속도가 빠르다. 
- 클래스형컴포넌트
    - props, state 둘다 사용가능
    - life-cycle 
---
## 2. props, state
- props: 단방향(부모 -> 자식) 데이터 흐름, 수정불가
    - props가 변경돌 경우 자식컴포넌트 render
    - [default prop](https://reactjs.org/docs/react-without-es6.html#declaring-default-props) 설정   
    - [prop-types](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) 설정 
- state: 데이터의 수정이 가능
    - state 변경시 컴포넌트 redner
    - state 변경을 원할경우 `setState({})` 함수를 사용(단, `setState({})`는 비동기로 작동하기때문에, 순서가 필요할 경우 [Callback](https://reactjs.org/docs/react-component.html#setstate) 스타일로 작성하도록해야한다.)

```
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header contents={"헤더"} />
        <Body contents={"바디"} />
        <Footer />
      </div>
    );
  }
}
// 함수영컴포넌트
const Header = props => {
  return (
    <header>
      {props.contents}
      <hr />
    </header>
  );
}

// 클래스형컴포넌트
class Body extends Component {
  constructor(prop) {
    // 생성자 (초기화를 해주지 않을경우, 예상치못한 버그가 발생할 수 있음)
    super(prop);
    this.state = {
      buttonClickCount: 0,
      buttonMessage: '버튼',
      bodyContests: {
        a: 1,
        b: 2
      }
    };

    // event binding
    this.onBtnClick = this.onBtnClick.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
  }

  onBtnClick() {
    /*
        이전의 데이터값을 참조할 경우 || setState 이전작업이 필요할 경우
        이전의 데이터값이 필요할 경우, 1번과 2번처럼 사용 할 수 있으나,
        1번처럼 사용 할 경우, 상태값을 업데이트하지 못할 경우가 발생 할 수 있다. 
        따라서 2번처럼 활용해야한다.
    */

    // 1.
    // this.setState({
    //   buttonClickCount: ++this.state.buttonClickCount
    // });

    // 2.
    // this.setState((prevState/*, props*/) => {
    //   return {
    //     buttonClickCount: ++prevState.buttonClickCount
    //   };
    // });

    // setState이후 작업이필요할때 callback 활용
    this.setState((prevState/*, props*/) => {
      return {
        buttonClickCount: ++prevState.buttonClickCount
      };
    }, () => {
    });
  }

  // state안의 객체안의 객체의 값을 변경할 경우
  onChangeState() {
    this.setState(prevState => {
      const state = prevState.bodyContests;
      state.a = ++state.a;
      return state;
    });
  }

  render() {
    return (
      <Fragment>
        <div>{this.props.contents}</div>
        <div>numberClick: {this.state.buttonClickCount}</div>
        <button onClick={this.onBtnClick}>{this.state.buttonMessage}</button>
        <hr />
        <div>a: {this.state.bodyContests.a}</div>
        <div>b: {this.state.bodyContests.b}</div>
        <button onClick={this.onChangeState}>state변경하기</button>
      </Fragment>
    );
  }
}

const Footer = (props) => {
  return (
    <div>
      <hr />
      {props.contents}
    </div>
  );
}

Footer.propTypes = {
  contents: PropTypes.string
};
Footer.defaultProps = {
  contents: '푸터'
}

export default App;
```
---
## 3. life-cycle
- Mount? 처음으로 랜더링될 때
- life-cycle 순서
    -  생성
        - **constructor()**
            - 생성자 초기화
            - props를 state에 복사하면안됨.
        - static getDerivedStateFromProps()
            - props에따른 state변화(setState설정은 사용하지 않음)
        - **render()**
        - **componentDidMount()**
            - Mount(render)된 이후 처음 1번만 실행
            - 초기화이벤트시 많이사용(ajax요청, 리엑트가 지원하지않는 event 활용시)
    - 업데이트
        - static getDerivedStateFromProps()
        - shouldComponentUpdate() 
            - 최적화 작업진행시 사용(props || state변경될때 render를 할지말지 결정)
        - render()
        - getSnapshotBeforeUpdate()
            - 렌더링이후, DOM에 업데이트되기 직전에 실행
            - 이곳의 return값을 다음 componentDidUpdate에서 받아 올 수 있음
            - 무조건 반환값이 있어야함(null 도 괜찮음)
        - **componentDidUpdate()**
            - DOM이 완성된 이후 실행함 (초기렌더링시 실행안함)
            - setState할경우, 무한루프에 빠질 수 있으니 조심해서 사용해야함
    - 마운트 해제
        - **componentWillUnmount()**
            - 만약 componendDidMount()에서 추가한 외부라이브러리나, componendDidMount에서 등록한 리엑트에서 지원하지않는 event를 제거해주어야한다.
    - 오류처리
        - static getDerivedStateFromError()
        - componentDidCatch()
    - 제거될 메서드(v17부터 완전히 제거된다고함)
        - ~~UNSAFE_componentWillMount()~~
        - ~~UNSAFE_componentWillUpdate()~~
        - ~~UNSAFE_componentWillReceiveProps()~~
- 자주사용하는 [lifecycle-methods-diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- ![lifecycleImg](./react-lifecycle.jpg)


```
import React, { Component, Fragment } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0
    };
  }
  render() {
    return (
      <div className="App">
        <Child
          number={this.state.number}
          onClick={(e) => {
            this.setState(prevState => {
              return {
                number: prevState.number + 1
              }
            });
          }}
        />
      </div>
    );
  }
}


class Child extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      a: 0 
    };
    console.log('Child constructor');
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    // 특정 props 가 바뀔 때 state값을 초기화시킬때 사용
    console.log('Child static getDerivedStateFromProps');
    if (nextProps.number !== prevState.number) {
      return { number: nextProps.number };
    } else {
      return null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    /* 
      return 에따른 렌더링유무
      true: 렌더링
      false: 렌더링안함
    */
    console.log('Child shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('Child getSnapshotBeforeUpdate');
    return 'snapshot!!';
    // return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // getSnapshotBeforeUpdate의 return결과를 snapshot로 받아 올 수 있다.
    // setState사용할경우 무한루프에 들어갈 수 있으니 조심해서 사용해야함
    console.log(`Child componentDidUpdate ${snapshot}`);;
  }

  componentDidMount() {
    console.log('Child componentDidMount');
  }

  render() {
    console.log('Child render');
    return (
      <Fragment>
        <div>child</div>
        <div>{this.state.number}</div>
        <button onClick={this.props.onClick}>클릭</button>
      </Fragment>
    );
  }

}
export default App;
```