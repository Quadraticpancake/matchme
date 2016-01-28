import React, { Component, PropTypes } from 'react'

class Prospect extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { prospect, actions, target } = this.props
    // prospect on line 14 should be the prospect choosen
    return (
      <div style={divStyle}> 
        <button onClick={ () => {
          actions.chooseMatch(target, prospect) }}>{prospect.first_name}</button>
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
