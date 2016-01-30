import React, { Component, PropTypes } from 'react'


const divStyle = {
  // width: 400,
  height: 600,
  width: "auto",
  // marginTop: 40,
  borderWidth: 1,
  borderColor: 'black',
  // opacity: .5,
  // backgroundColor: '#ccc',

  // display: 'block',
  // position:'relative',
  // verticalAlign: 'bottom',

  // backgroundImage: 'url(' + image_url + ')',
  // backgroundSize: 'cover',

  fontSize: 30,
  fontWeight: 'bold',
  fontFamily: 'Arial, Helvetica, sans-serif',
  // backgroundImage: 'http://i.onionstatic.com/onion/7954/original/1200.jpg',
  // WebkitTextFillColor: 'white',  Will override color (regardless of order)
  // WebkitTextStrokeWidth: 2,
  // WebkitTextStrokeColor: 'black',

  borderRadius: 5,
  zIndex: 1
}

const paraTargetStyle = {
  // backgroundColor: '#ccc',
  // position: 'absolute'
  // bottom: 0;
  width: "90%",

  fontSize: 20,
  fontWeight: 'bold',
  color:'black',
}

const imgTargetStyle = {
  maxWidth: '100%'
}

const backgroundDivStyle = {
  top: 0,
  left: 0,
  bottom: 0,
  backgroundColor: '#fff',
  right: 0,
  position: 'absolute',
  zIndex: -1,
  backgroundSize: 'cover',
  opacity: 0.5
}

const wellStyle = {
  // marginTop: 20
};

class Target extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const { target, actions } = this.props

    // let backgroundDivStyle = Object.assign({}, divStyle)
    // let newBackgroundDivStyle = Object.assign({},  backgroundDivStyle)
    // newBackgroundDivStyle.backgroundImage = 'url(' + 'http://localhost:3000' + target.image_url + ')'
    // /img/profilePics/female/8849159795035870722.webp

    // let targetHeight = $(document).height() - 500;
    let targetHeight = '49em';
    let wellStyle = {height: targetHeight};


    return (
      <div className='well well-sm col-md-6 col-sm-12 col-xs-12' style={wellStyle}>
        <div style={divStyle}>
         <label>{target.first_name}</label>
          <img src={target.image_url} style={imgTargetStyle}className="img img-responsive img-rounded center-block"/>
          <p style={paraTargetStyle} className="text-center">{target.description}</p>
        </div>

      </div>
    )
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}



export default Target
