import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import Matchee from '../components/Matchee';
import { routeActions } from 'react-router-redux';
import heart from '../../static/img/icons/heart';
import { Row } from 'react-bootstrap';
import css from './UserScore.scss';
import rightArrowImg from '../assets/Right_arrow.svg';
import leftArrowImg from '../assets/Left_arrow.svg';

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

class UserScore extends Component {
  componentDidMount() {
    const { actions, user_id, user } = this.props;
    if (user.isAuthenticated) {
      actions.fetchUserScore(user_id);
    }
    window.addEventListener('keyup', actions.changeIndex);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    window.removeEventListener('keyup', actions.changeIndex);
  }

  render() {
    const { userScore, index, actions } = this.props;

    const heartImg = <span>{heartSvg}
                <svg viewBox="0 0 32 32" style={heartFilledInStyle}>
                  <g filter="url(#inset-shadow)">
                    <use xlinkHref="#heart-icon"></use>
                  </g>
                </svg></span>;
    const renderedConnectionsMade = [];
    let score = 0;
    const leftArrow = <img src={leftArrowImg} className={css.arrow} onClick={() => { actions.changeIndex(-1); }} />;
    const rightArrow = <img src={rightArrowImg} className={css.arrow} onClick={() => { actions.changeIndex(1); }}/>;

    if (userScore) {
      score = userScore.score;
      for (var i = 0; i < userScore.pairs.length; i++) {
        renderedConnectionsMade.push(
          <div>
            <div>
              <Row xs={12} sm={12} md={5} className={css.matchee}>
                <Matchee matchee={userScore.pairs[i].user_one} />
                <Matchee matchee={userScore.pairs[i].user_two} />
              </Row>
              <Row xs={12} sm={12} md={5} className={css.arrows}>
                {(index > 0 && leftArrow) || <div className={css.arrow}></div>}
                {((index < userScore.pairs.length - 1) && rightArrow) || <div className={css.arrow}></div>}
              </Row>
            </div>
          </div>
        );
      }
    }

    let connectionCount;
    if (renderedConnectionsMade.length > 1) {
      connectionCount =
      <div className="text-center">
         You have helped create { renderedConnectionsMade.length } connections!
      </div>;
    } else if (renderedConnectionsMade.length === 1) {
      connectionCount =
      <div className="text-center">
         You have helped create { renderedConnectionsMade.length } connection!
      </div>;
    } else {
      connectionCount =
      <div className="text-center">
        You have yet to help create any connections
      </div>;
    }

    return (
      <div>
          <div>          
            <div className={css.header}>
              {connectionCount}
            </div>
          </div>
          <div>
            <div>
              {renderedConnectionsMade[index]}
            </div>
          </div>
          { userScore.pairs[index] && userScore.pairs[index].pairHeart &&
          <div className={css.header2}>
            <div className="text-center">
              {heartImg}
              {userScore.pairs[index].user_one.first_name} and {userScore.pairs[index].user_two.first_name} liked each other!
              {heartImg}
            </div>
          </div> }
        </div>
    );
  }
}

UserScore.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user_id: state.user.user_id,
    userScore: state.user.userScore,
    user: state.user,
    index: state.user.userScore.index
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(UserActions, dispatch),
    routerActions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserScore);
