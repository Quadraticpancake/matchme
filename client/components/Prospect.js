import React, { Component, PropTypes } from 'react'

let image_url = 'http://i.onionstatic.com/onion/7954/original/1200.jpg'

const divProspectStyle = {
  height: 300,
  margin: 10,
  marginBottom: -8,
  //float: 'left',
  // backgroundColor: '#ccc',
  display: 'block',
  verticalAlign: 'bottom',
  opacity: .5,
  borderWidth: 1,
  borderColor: 'black',

  backgroundImage: 'url(' + image_url + ')',
  backgroundSize: 'cover',

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
  width: '70%'
}

class Prospect extends Component {

  constructor(props, context) {
    super(props, context)
  }

  // <div className="row">
  //   <div onClick={ () => {
  //         actions.chooseMatch(target, prospect) }}>

  //     <div>
  //       <div style={divProspectStyle}> 
  //         <div style={divProspectNameStyle}>{prospect.first_name}</div>
  //       </div>
  //       <p style={paraProspectStyle}>{prospect.description}</p>
  //     </div>

      
  //   </div>
  // </div>
  //         <img src={prospect.image_url} style={imgProspectStyle}/>

  render() {
    const { prospect, actions, target } = this.props
    // prospect on line 14 should be the prospect choosen
    
    divProspectStyle.backgroundImage = 'url(' + 'http://localhost:3000' + prospect.image_url + ')'

    return (


      <div style={divProspectStyle} className='well' onClick={() => {actions.chooseMatch(target,prospect)}}>
        
        <label>{prospect.first_name}</label>


        <p style={paraProspectStyle} className="text-center">{prospect.description}</p>

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
