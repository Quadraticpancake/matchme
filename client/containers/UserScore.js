import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import Matchee from '../components/Matchee';
import { routeActions } from 'react-router-redux';
//import {Chat} from '../components/Chat';

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

const divStyle = {
  // width: 400,
//  height: 40,
  width: 'auto',
  marginleft: 0,
  marginRight: 0,
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
const smallImageStyle = {
  width: '10em',
  height: '10em'
};


class UserScore extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentWillMount(){
    const { user, routerActions } = this.props;
    //if user isn't authenticated reroute them to the home page
    if (!user.isAuthenticated) {
      routerActions.push('/home');
      return;
    }
  }

  componentDidMount() {
    const { actions, user_id, user} = this.props;
    if (user.isAuthenticated) {
      actions.fetchUserScore(user_id);
    }
  }

  render() {
    const { userScore } = this.props;

    // for testing purposes

    let heartButton = <div className="col-md-2"><img src={'https://freeiconshop.com/files/edd/heart-compact-flat.png'} style={smallImageStyle} /></div>
    let renderedConnectionsMade = [];
    let score = 0;
    if (userScore) {
      console.log(userScore);
      score = userScore.score;
      for (var i = 0; i < userScore.pairs.length; i++) {
        if (!userScore.pairs[i].pairHeart) {
          heartButton = <div></div>
        }
        renderedConnectionsMade.push(<div className="container" style={{marginBottom: 100}}>
                                       <div className="row-fluid">
                                         <div className="col-md-12">
                                           <div className="col-md-4" style={{marginRight: -15}}>
                                             <Matchee matchee={userScore.pairs[i].user_one} />
                                           </div> 
                                           <div className="col-md-4" style={{marginLeft: -15}}>
                                             <Matchee matchee={userScore.pairs[i].user_two} />
                                           </div> 
                                             {heartButton}                                          
                                         </div>
                                       </div>
                                     </div>
                                     );
      }
    }


    return (
      <section>
        {<div><div className='col-md-8 col-sm-8 col-xs-8' style={divStyle}><div className='text-center'>Your score is { score } </div><div className='text-center'>These are the wonderful connections you helped create</div></div><div>{renderedConnectionsMade}</div></div>}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    userScore: state.user.userScore,
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
    routerActions: bindActionCreators(routeActions, dispatch)
  };
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScore);
