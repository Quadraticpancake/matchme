import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LandingActions from '../actions/landing';
import { routeActions } from 'react-router-redux';
import { Row } from 'react-bootstrap';
import arrowcss from './UserScore.scss';
import rightArrowImg from '../assets/Right_arrow.svg';
import leftArrowImg from '../assets/Left_arrow.svg';
import css from './Landing.scss';

class Landing extends Component {

  componentDidMount() {
    const { actions } = this.props;
    window.addEventListener('keyup', actions.changeIndex);
  }

  componentWillUnmount() {
    const { actions } = this.props;
    window.removeEventListener('keyup', actions.changeIndex);
  }

  render() {
    const { actions, index, videoCount } = this.props;
    const leftArrow = <img src={leftArrowImg} className={arrowcss.arrow} onClick={() => { actions.changeIndex(-1); }} />;
    const rightArrow = <img src={rightArrowImg} className={arrowcss.arrow} onClick={() => { actions.changeIndex(1); }}/>;

    const videos = [];
    videos.push(<div>
          <div><img className={css.vidStyle} src="http://i.imgur.com/p8d5t0k.gif"/></div>
          <div><p className={css.descStyle}>Sign in using Facebook. The only information we need is your public profile. You can then edit your MatchMe profile.</p></div>
        </div>);
    videos.push(<div>
          <div><img className={css.vidStyle} src="http://i.imgur.com/nGpuchX.gif"/></div>
          <div><p className={css.descStyle}>Start matchmaking! Select the best match for the user on the left from the two options on the right. If there's no good match, click the 'Skip' button. Once a certain number of users make a match, the couple is connected.</p></div>
        </div>);
    videos.push(<div>
          <div><img className={css.vidStyle} src="http://i.imgur.com/WpjoQkt.gif"/></div>
          <div><p className={css.descStyle}>You earn 10 points for every match, 100 points if you matched a couple that gets connected, and 200 points if you're the vote that creates the connection! You can view your score and the connections you helped make under Score.</p></div>
        </div>);
    videos.push(<div>
          <img className={css.vidStyle} src="http://i.imgur.com/RAY6Ky0.gif"/>
          <p className={css.descStyle}>Spend the points you've earned to quick-match with users. They'll appear in your chatroom along with your other matches.</p>
        </div>);
    return (
      <div className={css.bodyDiv}>
        <div className={css.title}><div className={css.largeTitle}>Welcome to MatchMe!</div>The best place to matchmake and match up!</div>
        <div className={css.iconHolder}>
          <div className={css.iconSquare}>
            <img className={css.socksIconStyle} src="http://i.imgur.com/ccVfBe7.png"/>
            <p className={css.paraStyle}>Matchmake for other users &</p>
            <p className={css.paraStyle}>Get matched with other users</p>
          </div>
          <div className={css.iconSquare}>
            <img className={css.trophyIconStyle} src = "http://i.imgur.com/l2sj0g2.png"/>
            <p className={css.paraStyle}>Earn points for successful matchmaking</p>
          </div>
          <div className={css.iconSquare}>
            <img className={css.heartIconStyle} src="http://i.imgur.com/SuxgYjU.png"/>
            <a href = "/home"><p className={css.paraSignUpStyle}>Sign up to connect</p></a>
            <p className={css.paraStyle}>See how it all works below!</p></div>
        </div>
        <div className={css.title}>How to use MatchMe: </div>
        {videos[index]}
        <div>
          <Row xs={12} sm={12} md={5} className={css.arrows}>
            {(index > 0 && leftArrow) || <div className={css.arrow}></div>}
            {((index < videoCount - 1) && rightArrow) || <div className={css.arrow}></div>}
          </Row>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    index: state.landing.index,
    videoCount: state.landing.count
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LandingActions, dispatch),
    routerActions: bindActionCreators(routeActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
