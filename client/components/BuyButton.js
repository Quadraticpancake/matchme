import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import css from './Target.scss';

const buttonStyle = {
  width: '50%',
  fontSize: '100%'
};

class BuyButton extends Component {

  constructor(props, context) {
    super(props, context);
  }



  render() {
    console.log('PROPS', this.props);
    const { actions, person, user, dis } = this.props;

    const cost = -1000;
    const person_id = person.user_id;
    const user_id = user.user_id;

    return (
        <Button disabled={dis} className={css.button} responsive bsSize="large" bsStyle="info" onClick={() => {actions.buyCandidate(person_id, user_id, cost);}} >Match with { person.first_name }? ({cost} points)</Button>
    );
  }
}

BuyButton.propTypes = {
  actions: PropTypes.object.isRequired
};

export default BuyButton;
