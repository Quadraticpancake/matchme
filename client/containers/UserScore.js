import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
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
    let renderedConnectionsMade = userScore;

    /*
    for (var i = 0; i < connectionsMade.length; i++) {
      renderedConnectionsMade.push(<div>
                                   <div>You Made A Connection For</div>
                                   <ConnectionMade connectionMade={connectionsMade[i].user_one}/>
                                   <ConnectionMade connectionMade={connectionsMade[i].user_two}/>
                                   </div>);
    }
    */

    return (
      <section>
        {renderedConnectionsMade}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    connectionsMade: state.connectionsMade
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
