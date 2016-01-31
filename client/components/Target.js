import React, { Component, PropTypes } from 'react';
import SkipButton from '../components/SkipButton';

const divStyle = {
  // width: 400,
  height: 600,
  width: 'auto',
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
  fontFamily: 'Helvetica, sans-serif',
  // backgroundImage: 'http://i.onionstatic.com/onion/7954/original/1200.jpg',
  // WebkitTextFillColor: 'white',  Will override color (regardless of order)
  // WebkitTextStrokeWidth: 2,
  // WebkitTextStrokeColor: 'black',

  borderRadius: 5,
  zIndex: 1
};

const paraTargetStyle = {
  // backgroundColor: '#ccc',
  // position: 'absolute'
  // bottom: 0;
  width: '90%',

  fontSize: 20,
  fontWeight: 'bold',
  color:'black',
};

const imgTargetStyle = {
  maxWidth: '100%'
};

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
};

const wellStyle = {
  // marginTop: 20
};

const iconStyle = {
  height: 45,
  width: 'auto'
};

class Target extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { target, actions } = this.props;

    let targetHeight = '49em';
    let wellStyle = {height: targetHeight};

    let icon_user_path = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    if (target.gender === 'female') {
      icon_user_path = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    }

    let icon_seeking_path = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    if (target.gender_preference === 'female') {
      icon_seeking_path = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    }

    function calculateAge(birthdate) { 

      let difference = +Date.now() - +new Date(birthdate);
      let ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    let age = calculateAge(target.birthday);

    return (

      <div className='well well-sm col-md-6 col-sm-12 col-xs-12' style={wellStyle}>
        <div style={divStyle}>
         <label>{target.first_name}</label>
          <img src={target.image_url} style={imgTargetStyle} className="img img-responsive img-rounded center-block"/>

          <img src={icon_user_path} style={iconStyle}/> seeking <img src={icon_seeking_path} style={iconStyle}/>
          
          <p>age: {age}</p>
          <p style={paraTargetStyle}>''{target.description}''</p>
          <SkipButton actions={actions}/>
        </div>

      </div>


    );
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};



export default Target;
