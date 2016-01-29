import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Prospect from '../components/Prospect'
import Target from '../components/Target'
import * as MatchmakerActions from '../actions/matchmaker'
import Scoreboard from './Scoreboard'

           // <div className="col-md-2 hidden-sm hidden-xs" style={divStyle}>
           //    <Scoreboard />
           //  </div>
const divStyle = {
  top: 10,
  right: 10
}
class Home extends Component {
  render() {
    const { matchmaker, actions } = this.props
    return (
      <div>
        <div className="container">
          <div className="row-fluid">
              <Target target={matchmaker.target} actions={actions} />
              <div className='col-md-3'>
              <Prospect target={matchmaker.target} prospect={matchmaker.prospects[0]} actions={actions} />
              <Prospect target={matchmaker.target} prospect={matchmaker.prospects[1]} actions={actions} />
              </div>
            </div>
        </div>
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

