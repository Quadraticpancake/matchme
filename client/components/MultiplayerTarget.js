import React, { Component, PropTypes } from 'react';
import css from './Target.scss';
import { Col, Row, Image } from 'react-bootstrap';

const paraTargetStyle = {
  fontSize: '3vmin',
  color: 'black',
};

const seekingStyle = {
  fontSize: '2vmin'
};

const nameStyle = {
  fontSize: '5vmin'
};

class MultiplayerTarget extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { target } = this.props;
    if (!target || !target.first_name) {
      return (
        <Col xs={12} sm={12} md={6} >
          <Row className={css.target}/>
        </Col>
      );
    }

    const maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    const femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    const bothIcon = 'http://i.imgur.com/ku5iAME.png';

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
      if (birthdate === null) {
        return null;
      }
      const difference = +Date.now() - +new Date(birthdate);
      const ageDate = new Date(difference); // miliseconds from epoch
      const age = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (isNaN(age)) {
        return null;
      } else {
        return age;
      }
    }

    const age = calculateAge(target.birthday);

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
