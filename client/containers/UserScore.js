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

const divStyle = {
  // width: 400,
//  height: 40,
  width: 'auto',
  // marginTop: 40,
//  borderWidth: 1,
  borderColor: 'black',
  // opacity: .5,
  // backgroundColor: '#ccc',

  // display: 'block',
  // position:'relative',
  // verticalAlign: 'bottom',

  // backgroundImage: 'url(' + image_url + ')',
  // backgroundSize: 'cover',

  fontSize: 30,
  fontWeight: 'bold',
  fontFamily: 'Helvetica, sans-serif',
  // backgroundImage: 'http://i.onionstatic.com/onion/7954/original/1200.jpg',
  // WebkitTextFillColor: 'white',  Will override color (regardless of order)
  // WebkitTextStrokeWidth: 2,
  // WebkitTextStrokeColor: 'black',

  //borderRadius: 5,
  //zIndex: 1

};
/*
const testStyle = {
  float: 'left'
}
*/
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
    let score = 0;
    if (userScore) {
      console.log(userScore);
      score = userScore.score;
      for (var i = 0; i < userScore.pairs.length; i++) {
        renderedConnectionsMade.push(<div className="container">
                                       <div className="row-fluid">
                                         <div className="col-md-12">
                                           <div className="col-md-5">
                                             <Matchee matchee={userScore.pairs[i].user_one} />
                                           </div>
                                           <div className="col-md-5">
                                             <Matchee matchee={userScore.pairs[i].user_two} />
                                           </div>
                                         </div>
                                       </div>
                                     </div>);
      }
    }
    

    return (
      <section>
        {<div><div className='col-md-1'></div><div className='col-md-8 col-sm-8 col-xs-8' style={divStyle}><div className='text-center'>Your score is { score } </div><div className='text-center'>These are the wonderful connections you helped create</div></div>{renderedConnectionsMade}</div>}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    userScore: state.user.userScore
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
