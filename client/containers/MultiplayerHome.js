import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProspectMultiplayer from '../components/ProspectMultiplayer';
import MultiplayerTarget from '../components/MultiplayerTarget';
import * as MultiplayerActions from '../actions/multiplayer';
import { Col } from 'react-bootstrap';
import css from './Home.scss';
import { socket } from './App';
import { CountUp } from './countUp';

let counter = null;

const counterOptions = { useEasing: false,
  useGrouping: true,
  separator: ',',
  decimal: '.',
  prefix: '',
  suffix: ''
};

class MultiplayerHome extends Component {

  componentDidMount() {
    const { actions, user } = this.props;

    if (user.user_id !== null) {
      socket.emit('joinGame', { newPlayer: user.user_id });
    }

    socket.on('gameState', (gameState) => {
      actions.updateGameState(gameState);
      counter = new CountUp('counter', gameState.timer ? gameState.timer : 0, 0, 2, gameState.timer ? gameState.timer : 0, counterOptions);
      counter.start();
    });

    socket.on('getNewScore', () => {
      // get the user_id from this.props to update with state
      actions.updateScore(this.props.user.user_id);
    });
  }

  chooseMatchMP(target, prospect, voter) {
    socket.emit('vote', { voter, prospect });
  }

  render() {
    const { multiplayer, actions, user } = this.props;
    return (
      <div>
          <div id="timerContainer" className={css.timerContainer}>
          <div>Timer:</div> <div id="counter">{multiplayer.timer ? multiplayer.timer : 'Timer loading...'}</div>
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
                  user={user}/>
              </Col>
          </div>
      </div>
    );
  }
}

MultiplayerHome.propTypes = {
  matchmaker: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  multiplayer: PropTypes.object.isRequired
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
