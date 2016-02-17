import React, { Component, PropTypes } from 'react';
import { Row, Image } from 'react-bootstrap';
import css from './Matchee.scss';

      /*
      // Return Garbage
      <div className='well well-sm col-md-12 col-lg-12col-sm-6 col-xs-6' style={wellStyle}>
        <div style={divMatcheeStyle} >
          <img src={matchee.image_url} style={imgMatcheeStyle} className="img img-responsive img-rounded center-block"/>
        </div>
        <div style={matcheeInfoStyle}>
          <label>{matchee.first_name}, {age}</label> <img src={icon_matchee_path} style={iconMatcheeStyle}/>
          <p style={matcheeInfo}>''{matchee.description}''</p>
        </div>
      </div>
      */

const iconMatcheeStyle = {
  width: 25,
  height: 'auto',
  marginBottom: 7
};

const matcheeInfoStyle = {
  width: 'auto',
  marginTop: '1vw',
  marginLeft: '1vw',
  marginRight: '1vw'
};

const matcheeInfo = {
  marginTop: -6,
  fontSize: '2.2vmin'
};

const nameStyle = {
  fontSize: '2.6vmin'
};

class Matchee extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { matchee } = this.props;
    // matchee on line 14 should be the matchee choosen

    // divMatcheeStyle.backgroundImage = 'url(' + 'http://localhost:3000' + matchee.image_url + ')'
    function calculateAge(birthdate) {

      const difference = +Date.now() - +new Date(birthdate);
      const ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const age = calculateAge(matchee.birthday);

    const maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    const femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    const bothIcon = 'http://icons.iconarchive.com/icons/icons-land/vista-love/128/Sex-Unknown-icon.png';

    let icon_matchee_path = maleIcon;
    if (matchee.gender === 'female') {
      icon_matchee_path = femaleIcon;
    } else if (matchee.gender === 'both') {
      icon_matchee_path = bothIcon;
    }

    return (
      <Row className={css.prospect}>
          <Image src={matchee.image_url} responsive className={css.prospectImage}/>
        <div style={matcheeInfoStyle}>
          <h1 style={nameStyle}>
            {matchee.first_name}, {age}
            <Image src={ icon_matchee_path } style={iconMatcheeStyle}/> 
          </h1>
          <p style={matcheeInfo}>''{matchee.description}''</p>
        </div>
      </Row>
    );
  }
}

Matchee.propTypes = {
  matchee: PropTypes.object.isRequired
};

export default Matchee;
