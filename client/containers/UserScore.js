import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import Matchee from '../components/Matchee';
//import {Chat} from '../components/Chat';

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

class UserScore extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    const { actions, user_id } = this.props;
    actions.fetchUserScore(user_id);
  }

  render() {
    const { userScore } = this.props;

    // for testing purposes
    
    let renderedConnectionsMade = [];
    
    for (var i = 0; i < (userScore ? userScore.length : 0); i++) {
      renderedConnectionsMade.push(<div className="container">
                                     <div className="row-fluid">
                                       <div className='col-md-4'>
                                         <Matchee matchee={userScore[i].user_one} />
                                         <Matchee matchee={userScore[i].user_two} />
                                       </div>
                                     </div>
                                   </div>);
    }
    

    return (
      <section>
        {<div><div>These are the wonderful matches you have made</div>{renderedConnectionsMade}</div>}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    userScore: state.user.userScore,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScore);
