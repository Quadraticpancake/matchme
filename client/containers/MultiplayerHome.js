import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ProspectMultiplayer from '../components/ProspectMultiplayer';
import Target from '../components/Target';
import * as MultiplayerActions from '../actions/multiplayer';
import * as UserActions from '../actions/user'
import { Col, Row, Image} from 'react-bootstrap';
import css from './Home.scss';
import { socket } from './App';

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
class MultiplayerHome extends Component {

  chooseMatchMP(target, prospect, voter, triads) {
    socket.emit('vote', {voter: voter, prospect: prospect});
  }

  componentDidMount() {
    const { actions, user } = this.props;

    if (user.user_id !== null) {
      socket.emit('joinGame', { newPlayer: user.user_id });
    }

    socket.on('gameState', (gameState) => {
      actions.updateGameState(gameState);
    });
  }

  render() {
    const { multiplayer, actions, user, matchmaker } = this.props;
    console.log('chooseMatchMP', this.chooseMatchMP);

    return (
      <div>
          <div className="row-fluid">
            <Target target={multiplayer.target} actions={actions} user={user}/>
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

