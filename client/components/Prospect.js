import React, { Component, PropTypes } from 'react'

const wellStyle = {
  height: '24em',
  marginBottom: 15
}
const divProspectStyle = {
  height:250,
  width: "auto",
  //float: 'left',
  // backgroundColor: '#ccc',
  display: 'block',
  verticalAlign: 'bottom',
  borderWidth: 5,
  borderColor: 'black',

  fontSize: 35,
  fontWeight: 'bold',
  fontFamily: 'Arial, Helvetica, sans-serif',

  borderRadius: 5
}

const paraProspectStyle = {
  // backgroundColor: '#ccc',
  width: 150,
  fontSize: 18,
  fontWeight: 'bold',
  color:'black',
  position: 'absolute',
  right: 30
}

const divProspectNameStyle = {
}

const imgProspectStyle = {
  maxHeight: '100%',
  maxWidth: '100%',
  marginBottom: 10
}

const divStyle = {
  width: 200,
  height: 64,
  padding: 32,
  float: 'left',
}

class Prospect extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { prospect, actions, target } = this.props
    // prospect on line 14 should be the prospect choosen

    // divProspectStyle.backgroundImage = 'url(' + 'http://localhost:3000' + prospect.image_url + ')'

    return (
      <div className='well well-sm col-md-12 col-lg-12col-sm-6 col-xs-6' style={wellStyle} onClick={() => {actions.chooseMatch(target,prospect)}}>
        <label>{prospect.first_name}</label>
        <div style={divProspectStyle} >
          <img src={prospect.image_url} style={imgProspectStyle} className="img img-responsive img-rounded center-block"/>
        </div>
        <p>{prospect.description}</p>

      </div>
    )
  }
}

Prospect.propTypes = {
  prospect: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}



export default Prospect
