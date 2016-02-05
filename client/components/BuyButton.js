import React, { Component, PropTypes } from 'react';

const buttonStyle = {

};

class BuyButton extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('PROPS', this.props);
    const { actions, person, user } = this.props;

    return (
        <button type="button" style={buttonStyle} className="center-block" onClick={() => {actions.buyCandidate(person.user_id);}} >Match with { person.first_name }? (-1000 points)</button>
    );
  }
}

BuyButton.propTypes = {
  actions: PropTypes.object.isRequired
};

export default BuyButton;
