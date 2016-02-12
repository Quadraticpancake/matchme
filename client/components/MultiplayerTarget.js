import React, { Component, PropTypes } from 'react';
import SkipButton from '../components/SkipButton';
import css from './Target.scss';
import { Col, Row, Image, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import BuyButton from '../components/BuyButton';

const divStyle = {
  height: 600,
  width: 'auto',
  paddingTop: 10,
  borderWidth: 1,
  borderColor: 'black',
  fontSize: 30,
  fontWeight: 'bold',
  fontFamily: 'Helvetica, sans-serif',
  borderRadius: 5,
  zIndex: 1
};

const paraTargetStyle = {
  fontSize: '3vmin',
  color:'black',
};

const imgTargetStyle = {
  marginTop: '2vh',
  height: '50vh',
  marginLeft: 'auto',
  marginRight: 'auto'
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
  border: 'black',
  backgroundColor: '#eee'
};

const iconStyle = {
  height: '7vmin',
  width: 'auto'
};

const skipButtonStyle = {
  float: 'right',
  fontSize: 18,
  borderRadius: 5,
  backgroundColor: '#fff',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#132103ff", endColorstr="#ccfafe")',
  borderColor: '#ccfafe #ccfafe hsl(185, 100%, 85%)',
  color: '#333'
};

const buyButtonStyle = {
  float: 'right',
  fontSize: 18,
  borderRadius: 5,
  backgroundColor: '#fff',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#132103ff", endColorstr="#ccfafe")',
  borderColor: '#ccfafe #ccfafe hsl(185, 100%, 85%)',
  color: '#333'
}

const userInfoStyle = {
  marginLeft: 'auto',
  marginRight: 'auto'
}

const seekingStyle = {
  fontSize: '2vmin'
}

const nameStyle = {
  fontSize: '5vmin'
}

const multiplayerInfoStyle = {
  marginLeft: '5em'
}

class MultiplayerTarget extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {

    const { target, actions, user, triads } = this.props;
    if(!target || !target.first_name){
      return (
        <Col xs={12} sm={12} md={6} >
          <Row className={css.target}>
          </Row>
        </Col>
      );
    }
    let targetHeight = '90vh';

    let wellStyle = {height: targetHeight, backgroundColor: "#eee"};


    let maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    let femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    let bothIcon = 'http://i.imgur.com/ku5iAME.png';

    let icon_user_path = maleIcon;
    if (target.gender === 'female') {
      icon_user_path = femaleIcon;
    } if (target.gender === 'both') {
      icon_user_path = bothIcon;
    }

    let icon_seeking_path = maleIcon;
    if (target.gender_preference === 'female') {
      icon_seeking_path = femaleIcon;
    } else if (target.gender_preference === 'both') {
      icon_seeking_path = bothIcon;
    }

    function calculateAge(birthdate) {
      if(birthdate === null){
        return null;
      }
      let difference = +Date.now() - +new Date(birthdate);
      let ageDate = new Date(difference); // miliseconds from epoch
      let age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if(isNaN(age)){
        return null;
      } else {
        return age;
      }
    }

    let age = calculateAge(target.birthday);

    return (

      <Col xs={12} sm={12} md={6} >
        <Row className={css.target}>
          <Image src={target.image_url} responsive className={css.targetImage} />
          <div className={css.userInfo}>
            <h1 style={nameStyle}>{target.first_name}, {age}</h1>
            <div style={seekingStyle}>
              <Image src={icon_user_path} className={css.icon}/> seeking <Image src={icon_seeking_path} className={css.icon}/>
            </div>
            <p style={paraTargetStyle}>''{target.description}''</p>
          </div>
        </Row>
      </Col>


    );
  }
}

MultiplayerTarget.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default MultiplayerTarget;
