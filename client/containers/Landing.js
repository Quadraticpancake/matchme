import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

class Landing extends Component {
  componentWillMount(){
    /*
    const { matchmaker, actions, user } = this.props;
    if(matchmaker.target.placeholder){
      //getNewCandidates when target is currently placeholder
      actions.getNewCandidates(user.user_id, matchmaker.triads);
    }
    */
  }
  render() {
    const { matchmaker, actions, user } = this.props;
    //window.props = this.props;
    return (

      <div>
        This is a landing page
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);

