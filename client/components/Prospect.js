import React, { Component, PropTypes } from 'react';

const wellStyle = {
  height: '44vh',
  marginBottom: 15
};
const divProspectStyle = {
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

const paraProspectStyle = {
  // backgroundColor: '#ccc',
  width: 150,
  fontSize: 18,
  fontWeight: 'bold',
  color:'black',
  position: 'absolute',
  right: 30
};

const divProspectNameStyle = {
};

const imgProspectStyle = {
  maxHeight: '100%',
  maxWidth: '100%',
  marginBottom: 10
};

const divStyle = {
  width: 200,
  height: 64,
  padding: 32,
  float: 'left',
};

const iconProspectStyle = {
  width: 25,
  height: 'auto',
  marginBottom: 7
};

const prospectInfoStyle = {
  width: '90%',
  marginLeft: 10
};

const prospectInfo = {
  marginTop: -10
}

class Prospect extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { prospect, actions, target, user_id } = this.props;
    // prospect on line 14 should be the prospect choosen

    // divProspectStyle.backgroundImage = 'url(' + 'http://localhost:3000' + prospect.image_url + ')'
    function calculateAge(birthdate) {

      let difference = +Date.now() - +new Date(birthdate);
      let ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    let age = calculateAge(prospect.birthday);

    let maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    let femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    let bothIcon = 'http://i.imgur.com/ku5iAME.png';

    let icon_prospect_path = maleIcon;
    if (prospect.gender === 'female') {
      icon_prospect_path = femaleIcon;
    } else if (prospect.gender === 'both') {
      icon_prospect_path = bothIcon;
    }

    return (
     <div className='well well-sm col-md-12 col-lg-12col-sm-6 col-xs-6' style={wellStyle} onClick={() => {actions.chooseMatch(target, prospect, user_id);}}>
        <div style={divProspectStyle} >
          <img src={prospect.image_url} style={imgProspectStyle} className="img img-responsive img-rounded center-block"/>
        </div>
        <div style={prospectInfoStyle}>
          <label>{prospect.first_name}, {age}</label> <img src={icon_prospect_path} style={iconProspectStyle}/>
          <p style={prospectInfo}>''{prospect.description}''</p>
        </div>
      </div>
    );
  }
}

Prospect.propTypes = {
  prospect: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};



export default Prospect;
