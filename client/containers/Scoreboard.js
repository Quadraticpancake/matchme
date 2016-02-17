import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ScoreboardActions from '../actions/scoreboard';
import { socket } from './App';
import heart from '../../static/img/icons/heart';

const scoreboardStyle = {
  position: 'absolute',
  width: 230,
  right: 0,
  top: 0,
  marginTop: 50,
  bottom: 0,
  height: '100%',
  backgroundImage: 'linear-gradient(#C6E4EE 0%, #C6E4EE 40%, #FED1AE 60%, #FAA0B9 80%, rgb(254,67,101) 90%, #757ECB 95%)'
};

const heartSvg = heart();

const heartFilledInStyle = {
  marginLeft: 'auto',
  paddingTop: '2px',
  width: '2em',
  height: '2em',
  minWidth: '5vh',
  fill: '#FE4365',
  strokeWidth: '1px',
  stroke: 'black'
};

class Scoreboard extends Component {
  componentDidMount() {
    const { actions } = this.props;

    socket.on('scoreboard', (data) => {
      actions.updateScoreboard(data);
  	});
  }

  render() {
    const { scoreboard, actions } = this.props

    const scoreboardEntries = scoreboard.map((scoreboardEntry, index) => {
      return <ScoreboardEntry pair={scoreboardEntry.pair} key={index} />;
    });

    return (
      <div className="navbar-fixed-side navbar-fixed-side-right hidden-sm hidden-xs" style={scoreboardStyle}>
        {scoreboardEntries}
      </div>
    );
  }
}

const entryStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  marginTop: 10,
  marginBottom: -5
};

const thumbnailStyle = {
  marginLeft: '1vw',
  height: 60,
  width: 60,
  marginRight: 10,
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
};

const ScoreboardEntry = (props) => {
  return (
    <div className="well well-sm" style={entryStyle}>
      <img src={props.pair.target.image_url} style={thumbnailStyle}/>
      <img src={props.pair.prospect.image_url} style={thumbnailStyle}/>
      <br></br>
      {/* SVG Heart: heartSVG contains the definition of a SVG heart*/}
      <div style={{ display: 'flex', marginTop: '10px' }}>
        { heartSvg }
        {/* SVG Heart: the below SVG element actually places the SVG heart on the page*/}
        <svg viewBox="0 0 32 32" style={heartFilledInStyle} >
           <g filter="url(#inset-shadow)">
            <use xlinkHref="#heart-icon"></use>
          </g>
        </svg>
        <span>{props ? props.pair.target.first_name : ''} was just matched with {props ? props.pair.prospect.first_name : ''}</span>
      </div>
    </div>
  );
};

Scoreboard.propTypes = {
  scoreboard: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  pair: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    scoreboard: state.scoreboard
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ScoreboardActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard);
