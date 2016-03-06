import React, { Component, PropTypes } from 'react';
import { Row, Image } from 'react-bootstrap';
import css from './Prospect.scss';

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
  fontSize: '1.5vmin',
};

const nameStyle = {
  fontSize: '2.6vmin'
};

const voterInfo = {
  width: '2em',
  length: '2em'
};

class ProspectMultiplayer extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { prospect, target, user, triads, chooseMatch } = this.props;
    // prospect on line 14 should be the prospect choosen
    function calculateAge(birthdate) {
      const difference = +Date.now() - +new Date(birthdate);
      const ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const age = calculateAge(prospect.birthday);

    const maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    const femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    const bothIcon = 'http://i.imgur.com/ku5iAME.png';

    let icon_prospect_path = maleIcon;
    if (prospect.gender === 'female') {
      icon_prospect_path = femaleIcon;
    } else if (prospect.gender === 'both') {
      icon_prospect_path = bothIcon;
    }

    let renderedVoters = [];

    Object.keys(prospect.votes).map((vote) => {
        renderedVoters.push(<img src={prospect.votes[vote].userInfo.image_url} style={voterInfo} title={prospect.votes[vote].userInfo.first_name}/>);
    });

    return (
      <Row className={css.prospect} onClick={() => {chooseMatch(target, prospect, user, triads);}}>
          <Image src={prospect.image_url} responsive className={css.prospectImage}/>
        <div style={prospectInfoStyle}>
          <h1 style={nameStyle}>{prospect.first_name}, {age} <Image src={icon_prospect_path} style={iconProspectStyle}/> </h1>
          <p style={prospectInfo}>''{prospect.description}''</p>
          Voters:
          <p style={{ zIndex: 9999 }}>{renderedVoters}</p>
        </div>
      </Row>
    );
  }
}

ProspectMultiplayer.propTypes = {
  prospect: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  triads: PropTypes.object.isRequired
};


export default ProspectMultiplayer;
