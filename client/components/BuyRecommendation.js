import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import css from '../containers/Recommendation.scss';

class BuyRecommendation extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { actions, person, user, dis } = this.props;

    const cost = -1000;
    const person_id = person.user_id;
    const user_id = user.user_id;

    return (
      <Button
        className={css.buttonStyle}
        disabled={dis}
        bsStyle="info"
        onClick={() => {actions.buyRecommendation(person_id, user_id, cost);}}
      > Match with { person.first_name }? ({cost} points) </Button>
    );
  }
}

BuyRecommendation.propTypes = {
  actions: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  dis: PropTypes.object.isRequired
};

export default BuyRecommendation;
