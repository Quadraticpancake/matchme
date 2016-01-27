import React, { Component, PropTypes } from 'react'

class Target extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { target, actions } = this.props
    
    return (
      <div>
      	<label>{target.name}</label>
      </div>
    )
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

export default Target
