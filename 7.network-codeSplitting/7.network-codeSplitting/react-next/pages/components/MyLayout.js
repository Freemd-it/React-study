import React, {Component} from 'react'
import Header from './Header'


const layoutStyle = { 
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
}

class Layout extends Component {
  render() {
    const {children} = this.props
    return (
      <div style={layoutStyle}>
      <Header />
      {children}
      </div>
    )
  }
}

export default Layout