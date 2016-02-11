import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import css from './Target.scss';

const buttonStyle = {
  // width: '10%',
  fontSize: '140%',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  backgroundColor: '#601848',
  position: 'relative',
  bottom: 0
};

class BuyRecommendation extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { actions, person, user, dis} = this.props;

    const cost = -1000;
    const person_id = person.user_id;
    const user_id = user.user_id;

    return (
      <Button style={buttonStyle} disabled={dis} className={css.button} bsStyle="info" onClick={() => {actions.buyRecommendation(person_id, user_id, cost);}}> Match with { person.first_name }? ({cost} points) </Button>
    );
  }
}

BuyRecommendation.propTypes = {
  actions: PropTypes.object.isRequired
};

export default BuyRecommendation;