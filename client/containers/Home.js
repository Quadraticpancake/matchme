import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Prospect from '../components/Prospect';
import Target from '../components/Target';
import * as MatchmakerActions from '../actions/matchmaker';

           // <div className="col-md-2 hidden-sm hidden-xs" style={divStyle}>
           //    <Scoreboard />
           //  </div>
const divStyle = {
  top: 10,
  right: 10
};
class Home extends Component {
  componentWillMount(){
    const { matchmaker, actions, user } = this.props;
    if(matchmaker.target.placeholder){
      //getNewCandidates when target is currently placeholder
      actions.getNewCandidates();
    }
  }
  render() {
    const { matchmaker, actions, user } = this.props;
    window.props = this.props;
    console.log(user, 'this is the user_id');
    return (

      <div>
        <div>
          <div className="row-fluid">
            <Target target={matchmaker.target} actions={actions} user={user}/>
              <div className='col-md-4'>
              <Prospect target={matchmaker.target} prospect={matchmaker.prospects[0]} actions={actions} user={user} />
              <Prospect target={matchmaker.target} prospect={matchmaker.prospects[1]} actions={actions} user={user} />
              </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  matchmaker: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    matchmaker: state.matchmaker,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MatchmakerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

