import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Prospect from '../components/Prospect'
import Target from '../components/Target'
import * as MatchmakerActions from '../actions/matchmaker'

class Home extends Component {
  render() {
    const { matchmaker, actions } = this.props
    return (
      <div>
        <Target target={matchmaker.target} actions={actions} />
        <Prospect prospect={matchmaker.prospects.items[0]} actions={actions} />
        <Prospect prospect={matchmaker.prospects.items[1]} actions={actions} />
      </div>
    )
  }
}

Home.propTypes = {
  matchmaker: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    matchmaker: state.matchmaker
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(MatchmakerActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

