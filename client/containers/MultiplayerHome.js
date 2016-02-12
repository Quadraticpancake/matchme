import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProspectMultiplayer from '../components/ProspectMultiplayer';
import MultiplayerTarget from '../components/MultiplayerTarget';
import * as MultiplayerActions from '../actions/multiplayer';
import * as UserActions from '../actions/user'
import { Col, Row, Image} from 'react-bootstrap';
import css from './Home.scss';
import { socket } from './App';
import { CountUp } from './countUp';

const divStyle = {
  top: 10,
  right: 10
};

const parent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center'
}

let counter = null;
const counterOptions = {
  useEasing : false, 
  useGrouping : true, 
  separator : ',', 
  decimal : '.', 
  prefix : '', 
  suffix : '' 
};  

const timerContainerStyle = {
  paddingTop: '0.5em',
  width: '4em',
  height: '4em',
  fontSize: 'x-large',
  fontFamily: 'Lobster',
  textAlign: 'center',
  color: 'rgb(254, 67, 80)',
  backgroundColor: 'white',
  border: '5px solid rgb(96, 24, 72)',
  borderRadius: '50%',
  position: 'absolute',
  top: '48%',
  left: '45%',
  zIndex: '9999'
}

class MultiplayerHome extends Component {

  chooseMatchMP(target, prospect, voter, triads) {
    socket.emit('vote', {voter: voter, prospect: prospect});
  }

  componentDidMount() {
    const { actions, user, multiplayer } = this.props;

    if (user.user_id !== null) {
      socket.emit('joinGame', { newPlayer: user.user_id });
    }

    socket.on('gameState', (gameState) => {
      actions.updateGameState(gameState);
      counter = new CountUp("counter", gameState.timer ? gameState.timer : 0, 0, 2, gameState.timer ? gameState.timer : 0, counterOptions);
      counter.start();
    });

    socket.on('getNewScore', () => {
      actions.updateScore(this.props.user.user_id); // get the user_id from this.props instead of using the declared one above
                                                    // because the one above does not update along with the state
    });

  }

  render() {
    const { multiplayer, actions, user, matchmaker } = this.props;


    return (
      <div>
          <div id='timerContainer' className={css.timerContainer}>
            <div>Timer:</div> <div id='counter'>{multiplayer.timer ? multiplayer.timer : 'Timer loading...'}</div>
          </div>
          <div className="row-fluid">
            <MultiplayerTarget target={multiplayer.target} actions={actions} user={user}/>
              <Col xs={12} sm={12} md={5} className={css.prospect} >
                <ProspectMultiplayer 
                  target={multiplayer.target} 
                  prospect={multiplayer.prospects[0]} 
                  chooseMatch={this.chooseMatchMP}
                  user={user} />
                <ProspectMultiplayer 
                  target={multiplayer.target} 
                  prospect={multiplayer.prospects[1]} 
                  chooseMatch={this.chooseMatchMP}
                  user={user} />
              </Col>
          </div>
      </div>
    );
  }
}

MultiplayerHome.propTypes = {
  matchmaker: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    matchmaker: state.matchmaker,
    user: state.user,
    multiplayer: state.multiplayer

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MultiplayerActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultiplayerHome);

