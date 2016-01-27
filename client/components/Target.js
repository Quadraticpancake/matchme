import React, { Component, PropTypes } from 'react'

class Target extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { target, actions } = this.props
    
    return (
      <div style={divStyle}>
      	<label>{target.name}</label>
      </div>
    )
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const divStyle = {
  width: 200,
  height: 100,
  padding: 32,
  backgroundColor: '#ccc',
  WebkitTransition: 'all', // note the capital 'W' here
  msTransition: 'all', // 'ms' is the only lowercase vendor prefix
  borderRadius: 5
}

export default Target
