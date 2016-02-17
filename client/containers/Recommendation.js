import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import * as RecommendationActions from '../actions/recommendationActions';
import * as MatchmakerActions from '../actions/matchmaker.js';
import css from './Recommendation.scss';
import BuyRecommendation from '../components/BuyRecommendation.js';

class Recommendation extends Component {

  getRecommendation() {
    const { actions, user } = this.props;
    actions.postRecommendation(user.user_id, user.userInfo.gender, user.userInfo.gender_preference);
  }

  render() {
    const { recommendation, user, buyActions } = this.props;

    // gender icon
    const maleIcon = 'http://1.bp.blogspot.com/-9zJZ2kiHqFQ/VQCayOG1pxI/AAAAAAAADEU/igsvbvsPjKU/s1600/The%2BMale%2BPrinciple.png';
    const femaleIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons/3d-transparent-glass-icons-symbols-shapes/016921-3d-transparent-glass-icon-symbols-shapes-female-symbol.png';
    const bothIcon = 'http://i.imgur.com/ku5iAME.png';

    let iconPath = bothIcon;
    if (recommendation.gender === 'female') {
      iconPath = femaleIcon;
    } if (recommendation.gender === 'male') {
      iconPath = maleIcon;
    }

    // age calculation from birthday
    function calculateAge(birthdate) {
      const difference = +Date.now() - +new Date(birthdate);
      const ageDate = new Date(difference); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    const age = calculateAge(recommendation.birthday) || '? years old';

    return (

      <div style={{ marginLeft: '2%', marginTop: '0%' }}>
        <div className={css.algorithmDescription}>
          <h3 className={css.header3}> Let our algorithm help you find the perfect match...</h3>
          <h5 className={css.header5}>Looks are important. Our algorithm analyzes the matches that you've 'hearted' and conducts facial image analysis on their pictures to find other users you may like the look of. Try it now!</h5>        
        </div>
        <div className={css.robotDivStyle}>
          <img className={css.robotsStyle} src="http://i.imgur.com/83p3mf2.gif"/>
          <Button className={css.recommendationButton} type="button" onClick={() => {this.getRecommendation()}}> Get Matched! </Button>
        </div>
        <div className={css.recommendation}>
          <img className={css.recommendationImage} src={recommendation.image_url}/>
          <div className={css.prospectInfoStyle}>
            <h4 className={css.nameStyle}> {recommendation.first_name}, {age} <img src={iconPath} className={css.iconProspectStyle}/> </h4>
            <div className={css.prospectInfo}>''{recommendation.description}''</div>

            <a href="/chats">
            <BuyRecommendation dis={user.userScore.score < 1000 || recommendation.gender === 'none'} actions={buyActions} person={recommendation} user={user}/>
            </a>

          </div>

        </div>
      </div>
    );
  }
}

Recommendation.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  recommendation: PropTypes.object.isRequired,
  buyActions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    recommendation: state.recommendation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RecommendationActions, dispatch),
    buyActions: bindActionCreators(MatchmakerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendation);
