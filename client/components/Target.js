import React, { Component, PropTypes } from 'react';
import SkipButton from '../components/SkipButton';
import css from './Target.scss';
import { Col, Row, Image, ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap';
import BuyButton from '../components/BuyButton';

const divStyle = {
  // width: 400,
  height: 600,
  width: 'auto',
  paddingTop: 10,
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
  // width: '90%',
  fontSize: '3vmin',
  fontWeight: 'bold',
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
  // marginTop: 20
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
  fontSize: '3vmin'
}

const nameStyle = {
  fontSize: '5vmin'
}
class Target extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { target, actions, user } = this.props;

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
      // http://icons.iconarchive.com/icons/aha-soft/free-large-love/512/Sex-icon.png
      icon_seeking_path = bothIcon;
    }

    function calculateAge(birthdate) {

      let difference = +Date.now() - +new Date(birthdate);
      let ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    let age = calculateAge(target.birthday);

    // <container className='col-md-6 col-sm-12 col-xs-12 img-rounded' style={wellStyle}>
// && (user.userScore.score >= 1000
  // className="img img-responsive img-rounded center-block"
    return (

      <Col xs={12} sm={12} md={5} >
        <Row className={css.target}>
          <Image src={target.image_url} className={css.targetImage} />
          <div className={css.userInfo}>
            <h1 style={nameStyle}>{target.first_name}, {age}</h1>
            <div style={seekingStyle}>
              <Image src={icon_user_path} className={css.icon}/> seeking <Image src={icon_seeking_path} className={css.icon}/>
            </div>
            <p style={paraTargetStyle}>''{target.description}''</p>
            <div className={css.buttonContainer}>
              <BuyButton dis={(user.userScore.score < 1000) || (!user.isAuthenticated) || (target.gender_preference !== user.userInfo.gender && target.gender_preference !== 'both')} actions={actions} person={target} user={user}/>
              <SkipButton actions={actions} user_id={user.user_id}/>
            </div>
          </div>
        </Row>
      </Col>


    );
  }
}

Target.propTypes = {
  target: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};



export default Target;
