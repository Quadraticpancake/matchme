import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ScoreboardActions from '../actions/scoreboard'
import io from 'socket.io-client'


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
    return (
    	<div>
      <div>
        {scoreboard[0] ? scoreboard[0].pair.target.first_name : ''} just matched with {scoreboard[0] ? scoreboard[0].pair.prospect.first_name : ''}
      </div>
      <div>
        {scoreboard[1] ? scoreboard[1].pair.target.first_name : ''} just matched with {scoreboard[1] ? scoreboard[1].pair.prospect.first_name : ''}
      </div>
      <div>
        {scoreboard[2] ? scoreboard[2].pair.target.first_name : ''} just matched with {scoreboard[2] ? scoreboard[2].pair.prospect.first_name : ''}
      </div>
      <div>
        {scoreboard[3] ? scoreboard[3].pair.target.first_name : ''} just matched with {scoreboard[3] ? scoreboard[3].pair.prospect.first_name : ''}
      </div>
      <div>
        {scoreboard[4] ? scoreboard[4].pair.target.first_name : ''} just matched with {scoreboard[4] ? scoreboard[4].pair.prospect.first_name : ''}
      </div>
      </div>
    )
  }
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


