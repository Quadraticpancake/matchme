import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

const buttonStyle = {
  width: 500,
  marginRight: 5
}

class BuyButton extends Component {

  constructor(props, context) {
    super(props, context);
  }



  render() {
    console.log('PROPS', this.props);
    const { actions, person, user } = this.props;

    const cost = -1000;
    const person_id = person.user_id;
    const user_id = user.user_id;

    return (
        <button className="btn btn-primary btn-lg btn-responsive" style={buttonStyle} onClick={() => {actions.buyCandidate(person_id, user_id, cost);}} >Match with { person.first_name }? ({cost} points)</button>
    );
  }
}

BuyButton.propTypes = {
  actions: PropTypes.object.isRequired
};

export default BuyButton;
