import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ScoreboardActions from '../actions/scoreboard';
import { socket } from './App'

const scoreboardStyle = {
  position: 'absolute',
  width: 230,
  right: 0,
  top: 0,
  marginTop: 50,
  bottom: 0,
  backgroundColor: '#eee',
  borderRight: '1px solid #333',
  // padding: 16
}

class Scoreboard extends Component {
	componentDidMount() {
    const { actions } = this.props;

    socket.on('scoreboard', (data) => {
      actions.updateScoreboard(data);
		});
	}

  render() {
    const { scoreboard, actions } = this.props

    let scoreboardEntries = scoreboard.map((scoreboardEntry, index) => {
      return <ScoreboardEntry pair={scoreboardEntry.pair} key={index} />
    })

    console.log("Entries: ", scoreboardEntries)
    console.log("numEntries: ", scoreboardEntries.length)

    return (
      <div className="navbar-fixed-side navbar-fixed-side-right hidden-sm hidden-xs" style={scoreboardStyle}>
        {scoreboardEntries}
      </div>
    )
  }
}

const entryStyle = {
  marginTop: 10,
  marginBottom: -5
}

const thumbnailStyle = {
  height: 60,
  width: 60,
  borderRadius: 5,
  marginRight: 10
}

const heartIconStyle = {
  height: 22,

}

let heartIcon = 'http://findicons.com/files/icons/725/colobrush/256/pink_heart.png'
// let heartIcon = 'http://www.esevans.net/images/pinkheart.png'
// let heartIcon = 'http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/3d-transparent-glass-icons-culture/022152-3d-transparent-glass-icon-culture-heart-solid-sc44.png'
const ScoreboardEntry = (props) => {
  return (
    <div className="well well-sm" style={entryStyle}>
      <img src={props.pair.target.image_url} style={thumbnailStyle}/>
      <img src={props.pair.prospect.image_url} style={thumbnailStyle}/>
      <br></br>
      <img style={heartIconStyle} src={heartIcon}/>
      {props ? props.pair.target.first_name : ''} was just matched with {props ? props.pair.prospect.first_name : ''}
    </div>
  )
}

Scoreboard.propTypes = {
  scoreboard: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    scoreboard: state.scoreboard
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(ScoreboardActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Scoreboard)


