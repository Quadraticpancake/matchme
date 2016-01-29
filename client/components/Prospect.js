import React, { Component, PropTypes } from 'react'

let image_url = 'http://i.onionstatic.com/onion/7954/original/1200.jpg'

const divProspectStyle = {
  width: 200,
  height: 199,
  margin: 10,
  marginBottom: -8,
  //float: 'left',
  // backgroundColor: '#ccc',
  display: 'block',
  verticalAlign: 'bottom',

  backgroundImage: 'url(' + image_url + ')',
  backgroundSize: 'contain',

  fontSize: 35,
  fontWeight: 'bold',
  fontFamily: 'Arial, Helvetica, sans-serif',
  color:'white',
  // backgroundImage: 'http://i.onionstatic.com/onion/7954/original/1200.jpg',
  WebkitTextFillColor: 'white', /* Will override color (regardless of order) */
  WebkitTextStrokeWidth: 1.5,
  WebkitTextStrokeColor: 'black',

  borderRadius: 5
}

const paraProspectStyle = {
  // backgroundColor: '#ccc',
  width: 100,
  fontSize: 18,

  fontWeight: 'bold',
  color:'black',
  marginTop: 8
}

const divProspectNameStyle = {
}

class Prospect extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { prospect, actions, target } = this.props
    // prospect on line 14 should be the prospect choosen
    
    divProspectStyle.backgroundImage = 'url(' + 'http://localhost:3000' + prospect.image_url + ')'

    return (
      <div className="row">
        <div onClick={ () => {
              actions.chooseMatch(target, prospect)}}>

          <div className="col-md-8">
            <div style={divProspectStyle}> 
              <div style={divProspectNameStyle}>{prospect.first_name}</div>
            </div>
          </div>

          <div className="col-md-4">
            <p style={paraProspectStyle}>{prospect.description}</p>
          </div>
          
        </div>
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
  float: 'left',

}

export default Prospect
