import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ScoreboardActions from '../actions/scoreboard'
import io from 'socket.io-client'

const scoreboardStyle = {
  position: 'fixed',
  right: 0,
  top: 50,
  bottom: 0,
  backgroundColor: '#ccc',
  borderRight: '1px solid #333',
  padding: 16
}

class Scoreboard extends Component {
	componentDidMount() {
		const { actions } = this.props
		const socket = io()
		socket.on('scoreboard', (data) => {
		  actions.updateScoreboard(data)
		})
	}

  render() {
    const { scoreboard, actions } = this.props

    let scoreboardEntries = scoreboard.map((scoreboardEntry) => {
      return <ScoreboardEntry pair={scoreboardEntry.pair} />
    })

    console.log("Entries: ", scoreboardEntries)
    console.log("numEntries: ", scoreboardEntries.length)

    return (
    	<div style={scoreboardStyle}>
        <div className="scoreboardEntries">
          {scoreboardEntries}
        </div>
      </div>
    )
  }
}


const ScoreboardEntry = (props) => {
  return (
    <div>
      {props ? props.pair.target.first_name : ''} just matched with {props ? props.pair.prospect.first_name : ''}
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


