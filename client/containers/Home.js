import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Prospect from '../components/Prospect';
import Target from '../components/Target';
import * as MatchmakerActions from '../actions/matchmaker';
import { Col, Row, Image} from 'react-bootstrap';
import css from './Home.scss';

           // <div className="col-md-2 hidden-sm hidden-xs" style={divStyle}>
           //    <Scoreboard />
           //  </div>
const divStyle = {
  top: 10,
  right: 10
};

const parent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}
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

      <div className="container-fluid">
          <div className="row-fluid">
            <Target target={matchmaker.target} actions={actions} user={user}/>
              <Col xs={12} sm={12} md={4} className={css.prospect} >
              <Prospect target={matchmaker.target} prospect={matchmaker.prospects[0]} actions={actions} user={user} />
              <Prospect target={matchmaker.target} prospect={matchmaker.prospects[1]} actions={actions} user={user} />
              </Col>
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

