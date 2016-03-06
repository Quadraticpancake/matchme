import React, { Component, PropTypes } from 'react';
import { Row, Image } from 'react-bootstrap';
import css from './Prospect.scss';
import maleIcon from '../../img/icons/male_icon.png';
import femaleIcon from '../../img/icons/female_icon.png';
import bothIcon from '../../img/icons/both_icon.png';

const iconProspectStyle = {
  width: 25,
  height: 'auto',
  marginBottom: 7
};

const prospectInfoStyle = {
  width: 'auto',
  marginTop: '1vw',
  marginLeft: '1vw',
  marginRight: '1vw'
};

const prospectInfo = {
  marginTop: -6,
  fontSize: '2.2vmin'
};

const nameStyle = {
  fontSize: '2.6vmin'
};

class Prospect extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { prospect, actions, target, user, triads } = this.props;
    // prospect on line 14 should be the prospect choosen

    if (!prospect || !prospect.first_name) {
      return (<Row className={css.prospect}></Row>);
    }

    // divProspectStyle.backgroundImage = 'url(' + 'http://localhost:3000' + prospect.image_url + ')'
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

    const age = calculateAge(prospect.birthday);

    // let maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    // let femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    // let bothIcon = 'http://i.imgur.com/ku5iAME.png';

    let icon_prospect_path = maleIcon;
    if (prospect.gender === 'female') {
      icon_prospect_path = femaleIcon;
    } else if (prospect.gender === 'both') {
      icon_prospect_path = bothIcon;
    }


    return (
      <Row className={css.prospect} onClick={() => {actions.chooseMatch(target, prospect, user.user_id, triads);}}>
          <Image src={prospect.image_url} responsive className={css.prospectImage}/>
        <div style={prospectInfoStyle}>
          <h1 style={nameStyle}>{prospect.first_name}, {age} <Image src={icon_prospect_path} style={iconProspectStyle}/> </h1>
          <p style={prospectInfo}>''{prospect.description}''</p>
        </div>
      </Row>
    );
  }
}

Prospect.propTypes = {
  prospect: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  triads: PropTypes.object.isRequired
};



export default Prospect;
