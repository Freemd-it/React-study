# React 이벤트 처리

- 주의해야 할 특징
	- react에서는 이벤트를 JSX에 문자열 대신 함수를 전달한다.
	- 이벤트는 camelCase를 사용한다. (onclick X -> onClink O)
	- {} (이벤트 처리기)로 함수 이름을 전달한다.


## 이벤트 사용
~~~
//HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>
 
//React
<button onClick={activateLasers}>
  Activate Lasers
</button>
~~~

리액트에서는 onClick에서 전처리기를 통해 함수명을 전달해 줍니다.



## 이벤트 취소

HTML에서 새로운 페이지를 여는 기본 링크 동작을 막으려면 이렇게 작성할 수 있습니다.
~~~
//HTML
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
~~~
return false;로 추후 이벤트를 취소하여 href url의 링크이동을 막아주고 있습니다.

하지만 React에서는 기본 동작을 막기 위해 false 리턴을 사용할 수 없습니다.
반드시 명시적으로 preventDefault 를 호출해야 합니다. 

~~~
//React
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
 
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
~~~

여기서 e 는 합성 이벤트입니다. e.preventDefault();를 이용해서 발생할 다른 이벤트를 차단해줍니다.
React를 사용할 때 일반적으로 DOM 요소가 생성된 후에 리스너를 추가하기 위해 addEventListener 를 호출할 필요가 없습니다. 대신 요소가 처음 렌더링될 때 리스너를 제공합니다.

ES6 class 를 이용해 요소를 정의할 때 이벤트 핸들러의 일반적인 패턴은 클래스의 메서드 형태입니다. 예를 들어, 아래 Toggle 컴포넌트는 “ON” 과 “OFF” state를 유저가 토글할 수 있게 하는 버튼을 렌더링합니다.

https://codepen.io/gaearon/pen/xEmzGg?editors=0010




## 이벤트 핸들러에 인수 전달하기
~~~
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
~~~

반복 안에서 보통 이벤트 핸들러에 추가 파라미터를 전달하고 싶어할 것입니다. 예를 들어, 만약 id 가 원시적인 ID라면, 위처럼 전달할 수 있습니다.
위 두 라인은 동일하며, arrow functions과 Function.prototype.bind 를 각각 사용하고 있습니다.

두 경우 모두, React 이벤트를 나타내는e 인수는 ID 뒤에 두 번째 인수로 전달됩니다. arrow function을 사용하여 명시적으로 전달해야하지만,bind를 사용하면 추가 인수가 자동으로 전달됩니다.

- bind는 일반적으로 onClick={this.handleClick} 처럼 () 없이 메서드를 참조하기 위해 사용합니다.
- bind 를 호출하는 게 귀찮은 경우 이 문제를 해결할 수 있는 두가지 방법이 있습니다. 
	1. 실험 기능인 퍼블릭 클래스 필드 문법 을 사용한다면 클래스 필드를 정확히 콜백에 bind할 수 있습니다.
	~~~
	class LoggingButton extends React.Component {
	  // This syntax ensures `this` is bound within handleClick.
	  // Warning: this is *experimental* syntax.
	  handleClick = () => {
	    console.log('this is:', this);
	  }

	  render() {
	    return (
	      <button onClick={this.handleClick}>
	        Click me
	      </button>
	    );
	  }	
	}
	~~~
	2. 콜백에서 arrow function 을 사용할 수도 있습니다.
	~~~
		class LoggingButton extends React.Component {
	  handleClick() {
	    console.log('this is:', this);
	  }

	  render() {
	    // This syntax ensures `this` is bound within handleClick
	    return (
	      <button onClick={(e) => this.handleClick(e)}>
	        Click me
	      </button>
	    );
	  }
	}
	~~~
	- 하지만 이 문법은 LogginButton 을 렌더링할 때마다 서로 다른 콜백이 만들어진다는 문제점이 있습니다. 따라서 보통 생섬자 함수에서 바인딩하거나 클래스 필드 문법을 사용하는 걸 권장합니다.

