import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RecommendationActions from '../actions/recommendationActions';

class Recommendation extends Component {

  getRecommendation() {
    const {actions, user} = this.props;
    actions.postRecommendation(user.user_id, user.userInfo.gender, user.userInfo.gender_preference);
  }

  render() {

    // <img src='http://i.imgur.com/nTpf2tW.gif'/>
    const {recommendation, user} = this.props;
    console.log('RECOMMENDATION', recommendation)
  
    return (
      <div>
        <h1>Here is our incredibly superficial recommendation!</h1>
        <p>Our sophisticated matching algorithm takes into account not only who you get matched with, but also who you connect with to find you the perfect match!</p>
        
        <img src='http://i.imgur.com/OGG5Hka.png'/>
        <button onClick={() => {this.getRecommendation()}}> Get our match for you! </button>
        <div>
          <img src={recommendation.image_url}/>
          <h4>Name: {recommendation.first_name}</h4>
          <h5>{recommendation.description}</h5>
        </div>
      </div>
    );
  }
}

Recommendation.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  recommendation: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    recommendation: state.recommendation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RecommendationActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recommendation);


