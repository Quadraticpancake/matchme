import React, { Component, PropTypes } from 'react'


const divStyle = {
  // width: 400,
  height: 600,
  margin: 10,
  // marginTop: 40,
  borderWidth: 1,
  borderColor: 'black',
  // opacity: .5,
  // backgroundColor: '#ccc',
 
  display: 'block',
  position:'relative',
  verticalAlign: 'bottom',

  // backgroundImage: 'url(' + image_url + ')',
  // backgroundSize: 'cover',

  fontSize: 50,
  fontWeight: 'bold',
  color:'white',
  fontFamily: 'Arial, Helvetica, sans-serif',
  // backgroundImage: 'http://i.onionstatic.com/onion/7954/original/1200.jpg',
  WebkitTextFillColor: 'white', /* Will override color (regardless of order) */
  WebkitTextStrokeWidth: 2,
  WebkitTextStrokeColor: 'black',

  borderRadius: 5,
  zIndex: 1
}

const paraTargetStyle = {
  // backgroundColor: '#ccc',
  // position: 'absolute'
  // bottom: 0;
  width: "95%",

  fontSize: 25,
  fontWeight: 'bold',
  color:'black',
  position: 'absolute',
  bottom: 0
}

const imgTargetStyle = {
  width: '100%'
}

const backgroundDivStyle = {
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  zIndex: -1,
  backgroundSize: 'cover',
  opacity: 0.5
}
//        <img src={target.image_url} style={imgTargetStyle}/>

const fadeAway = {
  // position: 'absolute',
  // top:0,
  // left:0,
  // width:'100%',
  // height:'100%',
  // backgroundColor: '#ccc'
  // background:transparent,
  // background: linear-gradient(top, rgba( 255, 255, 255, 255 ) 0%, rgba( 255, 255, 255, 1 ) 100% ),
  // background: -moz-linear-gradient(top, rgba( 255, 255, 255, 0) 0%, rgba( 255, 255, 255, 1 ) 100% ),
  // background: -ms-linear-gradient(top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% ),
  // background: -o-linear-gradient( top, rgba( 255, 255, 255, 0 ) 0%, rgba( 255, 255, 255, 1 ) 100% ),
}

class Target extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { target, actions } = this.props

    // let backgroundDivStyle = Object.assign({}, divStyle)
    let newBackgroundDivStyle = Object.assign({},  backgroundDivStyle)
    newBackgroundDivStyle.backgroundImage = 'url(' + 'http://localhost:3000' + target.image_url + ')'
    // /img/profilePics/female/8849159795035870722.webp

    return (
      <div style={divStyle} className='well'>
        <div style={newBackgroundDivStyle}></div>
        <div style={fadeAway}></div>

      	<label>{target.first_name}</label>
       
        <p style={paraTargetStyle} className="text-center">{target.description}</p>

      </div>
    )
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}



export default Target
