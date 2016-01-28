import React, { Component, PropTypes } from 'react'

class Prospect extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { prospect, actions } = this.props

    return (
      <div style={divStyle}>
      	<button onClick={actions.chooseMatch}>{prospect.name}</button>
      </div>
    )
  }
}

Prospect.propTypes = {
  prospect: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

const divStyle = {
  width: 200,
  height: 64,
  padding: 32,
  float: 'left'
}

export default Prospect
