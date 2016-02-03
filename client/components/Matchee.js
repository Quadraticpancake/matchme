import React, { Component, PropTypes } from 'react';

const wellStyle = {
  height: '24em',
  marginBottom: 15,
};
const divMatcheeStyle = {
  height:250,
  width: 'auto',
  //float: 'left',
  // backgroundColor: '#ccc',
  display: 'block',
  verticalAlign: 'bottom',
  borderWidth: 5,
  borderColor: 'black',

  fontSize: 35,
  fontWeight: 'bold',
  fontFamily: 'Arial, Helvetica, sans-serif',

  borderRadius: 5
};

const paraMatcheeStyle = {
  // backgroundColor: '#ccc',
  width: 150,
  fontSize: 18,
  fontWeight: 'bold',
  color:'black',
  position: 'absolute',
  right: 30
};

const divMatcheeNameStyle = {
};

const imgMatcheeStyle = {
  maxHeight: '100%',
  maxWidth: '100%',
  marginBottom: 10,
};

const divStyle = {
  width: 200,
  height: 64,
  padding: 32,
  float: 'left',
};

const iconMatcheeStyle = {
  width: 25,
  height: 'auto',
  marginBottom: 7
};

const matcheeInfoStyle = {
  width: '90%',
  marginLeft: 10
};

const matcheeInfo = {
  marginTop: -10
}

class Matchee extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { matchee } = this.props;
    // matchee on line 14 should be the matchee choosen

    // divMatcheeStyle.backgroundImage = 'url(' + 'http://localhost:3000' + matchee.image_url + ')'
    function calculateAge(birthdate) { 

      let difference = +Date.now() - +new Date(birthdate);
      let ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    let age = calculateAge(matchee.birthday);

    let maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    let femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    let bothIcon = 'http://icons.iconarchive.com/icons/icons-land/vista-love/128/Sex-Unknown-icon.png';

    let icon_matchee_path = maleIcon;
    if (matchee.gender === 'female') {
      icon_matchee_path = femaleIcon;
    } else if (matchee.gender === 'both') {
      icon_matchee_path = bothIcon;
    }
    
    return (
      <div className='well well-sm col-md-12 col-lg-12col-sm-6 col-xs-6' style={wellStyle}>
        <div style={divMatcheeStyle} >
          <img src={matchee.image_url} style={imgMatcheeStyle} className="img img-responsive img-rounded center-block"/>
        </div>
        <div style={matcheeInfoStyle}>
          <label>{matchee.first_name}, {age}</label> <img src={icon_matchee_path} style={iconMatcheeStyle}/>
          <p style={matcheeInfo}>''{matchee.description}''</p>
        </div>
      </div>
    );
  }
}

Matchee.propTypes = {
  matchee: PropTypes.object.isRequired
};



export default Matchee;
