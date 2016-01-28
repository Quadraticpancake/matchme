import React, { Component, PropTypes } from 'react'

let image_url = 'http://i.onionstatic.com/onion/7954/original/1200.jpg'

const divStyle = {
  width: 400,
  height: 400,
  margin: 20,
  // borderWidth: 1,
  // borderColor: 'black',
  // backgroundColor: '#ccc',
 
  display: 'table-cell',
  verticalAlign: 'bottom',

  backgroundImage: 'url(' + image_url + ')',
  backgroundSize: 'contain',

  fontSize: 50,
  fontWeight: 'bold',
  color:'white',
  fontFamily: 'Arial, Helvetica, sans-serif',
  // backgroundImage: 'http://i.onionstatic.com/onion/7954/original/1200.jpg',
  WebkitTextFillColor: 'white', /* Will override color (regardless of order) */
  WebkitTextStrokeWidth: 2,
  WebkitTextStrokeColor: 'black',

  borderRadius: 5
}

const paraTargetStyle = {
  // backgroundColor: '#ccc',
  // position: 'absolute'
  // bottom: 0;
  width: 400,

  fontSize: 25,
  fontWeight: 'bold',
  color:'black',
}

class Target extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { target, actions } = this.props

    divStyle.backgroundImage = 'url(' + 'http://localhost:3000' + target.image_url + ')'
    // /img/profilePics/female/8849159795035870722.webp

    return (
      <div>
        <div style={divStyle}>
        	<label>{target.first_name}</label>
        </div>
        <p style={paraTargetStyle}>{target.description}</p>
      </div>
    )
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}



export default Target
