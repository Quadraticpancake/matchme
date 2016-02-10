import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as RecommendationActions from '../actions/recommendationActions';

const description = {
  width: '70%',
  border: '0 solid #ccc',
}

const robotDivStyle = {
  float: 'left',
  margin: 20,
  marginRight: 50
}

const robotStyle = {
  height: 250,
  width: 'auto',

}

const recommendationStyle = {
  paddingTop: 30,
  width: '20%',
  float: 'left',
  // backgroundColor: 'red',
  paddingLeft: 20
  
}

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
        <div style={description}>
          <h1>Let our algorithm help you find the perfect match...</h1>
          <h3>Looks are important. Our algorithm analyzes your matches and conducts facial image analysis on their pictures, calculating scores for characteristics such as age, coloring, and expression as well as detailed facial feature analysis. We use this data to find other users you may like the look of. Try it now and let math be your matchmaker!</h3>
        </div>
        <div style={robotDivStyle}>
          <img style={robotStyle} src='http://i.imgur.com/20Whp63.gif'/>
          <button onClick={() => {this.getRecommendation()}}> Get our match for you! </button>
        </div>
        <div style={recommendationStyle}>
          <img src={recommendation.image_url}/>
            <h4>{recommendation.first_name}</h4>
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


