import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import Matchee from '../components/Matchee';
import { routeActions } from 'react-router-redux';
import heart from '../../static/img/icons/heart';
//var hotkey = require('react-hotkey');
//import {Chat} from '../components/Chat';

//hotkey.activate();

// @connect(
//   state => state.items,
//   dispatch => bindActionCreators(actionCreators, dispatch)
// )

const heartSvg = heart();
const heartFilledInStyle = {
  marginLeft: 'auto',
  paddingTop: '2px',
  width: '2em',
  height: '2em',
  minWidth: '5vh',
  fill: '#FE4365',
  strokeWidth: '1px',
  stroke:'black'
};

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

const heartIconStyle = {
  height: 22,

}

const smallImageStyle = {
  width: '10em',
  height: '10em'
};

const leftArrowStyle = {
  width: '5em',
  height: '5em',
  marginTop: 120,
  marginLeft: 0
};

const rightArrowStyle = {
  width: '5em',
  height: '5em',
  marginTop: 120,
  marginLeft: 380
}


class UserScore extends Component {

  componentDidMount() {
    const { actions, user_id, user} = this.props;
    if (user.isAuthenticated) {
      actions.fetchUserScore(user_id);
    }
    actions.listenToArrowPress
    window.addEventListener('keyup', actions.changeIndex);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    window.removeEventListener('keyup', actions.changeIndex);
  }

  render() {
    const { userScore, index, actions } = this.props;

    let rightArrowImg = 'https://www.wpclipart.com/signs_symbol/BW/direction_arrows/right_arrow.png';
    let leftArrowImg = 'https://www.wpclipart.com/signs_symbol/BW/direction_arrows/.cache/left_arrow.png';
    let heartImg = <span>{heartSvg}
                <svg viewBox="0 0 32 32" style={heartFilledInStyle}>
                  <g filter="url(#inset-shadow)">
                    <use xlinkHref="#heart-icon"></use>
                  </g>
                </svg></span>;
    let renderedConnectionsMade = [];
    let score = 0;
    if (userScore) {
      score = userScore.score;
      for (var i = 0; i < userScore.pairs.length; i++) {
        renderedConnectionsMade.push(<div className="container">
                                       <div className="row-fluid">
                                         <div>
                                           <div className="col-md-4" style={{marginLeft: 15}}>
                                             <Matchee matchee={userScore.pairs[i].user_one} />
                                           </div>
                                           <div className="col-md-4" style={{marginLeft: -30}}>
                                             <Matchee matchee={userScore.pairs[i].user_two} />
                                           </div>
                                         </div>
                                       </div>
                                     </div>
                                     );
      }
    }



    let leftArrow = <img src={leftArrowImg} style={leftArrowStyle} onClick={() => { actions.changeIndex(-1); }} />
    let rightArrow = <img src={rightArrowImg} style={rightArrowStyle} onClick={() => { actions.changeIndex(1); }}/>

    let connectionCount;
    if (renderedConnectionsMade.length > 1) {
      connectionCount =
      <div className='text-center' style={{marginLeft: 0}}>
         You have helped create { renderedConnectionsMade.length } connections
      </div>;
    } else if (renderedConnectionsMade.length === 1) {
      connectionCount =
      <div className='text-center' style={{marginLeft: 0}}>
         You have helped create { renderedConnectionsMade.length } connection
      </div>;
    } else {
      connectionCount =
      <div className='text-center' style={{marginLeft: 0}}>
        You have yet to help create any connections
      </div>;
    }

    return (
      <section>
        {<div>
          <div className='col-md-8 col-sm-8 col-xs-8' style={divStyle}>
            <div className='text-center' style={{marginLeft: 200}}>
              Your score is { score }
            </div>
            <div className='text-center' style={{marginLeft: 200}}>
              {connectionCount}
            </div>
          </div>
          <div className='col-md-8'>
            <div className='col-md-1'>
              {index > 0 && leftArrow}
            </div>
            <div className='col-md-6'>
              {renderedConnectionsMade[index]}
            </div>
            <div className='col-md-1'>
              {(index < renderedConnectionsMade.length - 1) && rightArrow}
            </div>
          </div>
          { userScore.pairs[index] && userScore.pairs[index].pairHeart &&
          <div className='col-md-8' style={divStyle}>
            <div className='text-center' style={{marginLeft: 170}}>
              <span>
                {heartImg}
                {userScore.pairs[index].user_one.first_name} and {userScore.pairs[index].user_two.first_name} liked each other!
                {heartImg}
              </span>
            </div>
          </div> }
        </div>}
      </section>
    );
  }
}

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    userScore: state.user.userScore,
    user: state.user,
    index: state.user.userScore.index
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
    routerActions: bindActionCreators(routeActions, dispatch)
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScore);