import React, { Component, PropTypes } from 'react';

const buttonStyle = {

};

class SkipButton extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    console.log('PROPS', this.props);
    const { actions } = this.props;

    return (
        <button type="button" style={buttonStyle} className="center-block" onClick={() => {actions.getNewCandidates();}} >No good match?</button>
    );
  }
}

SkipButton.propTypes = {
  actions: PropTypes.object.isRequired
};

export default SkipButton;
