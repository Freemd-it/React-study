import Link from 'next/link';
import { withRouter } from 'next/router';
import React, { Component } from 'react';
import Title from './Title';

const linkStyle = {
  marginRight: 15,
}

// Router.beforePopState(({ url, as, options }) => {
//   if( as !== '/about' || as !== '/other') {
//     window.location.href = as
//     return false
//   }
//   return true
// })

class Header extends Component {
  ComponentDidMount() {
    const { router } = this.props
    router.prefetch('/about')
  }
  render() {
    const { router } = this.props
    return (
      <div>
        <Title />
        <Link prefetch href="/">
          <a style={linkStyle}>홈</a>
        </Link>
        &nbsp;&nbsp;
        <Link href="/about">
          <a style={linkStyle}>어바웃</a>
        </Link>
        &nbsp;&nbsp;
        <Link href="/ssr-test">
          <a style={linkStyle}>랜더링테스트</a>
        </Link>
      </div>
    )
  }
}

export default Header