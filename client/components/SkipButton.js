import React, { Component, PropTypes } from 'react';

const buttonStyle = {

  fontSize: 18,
  borderRadius: 5,

  backgroundColor: '#fff',
  backgroundRepeat: 'repeat-x',
  filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#132103ff", endColorstr="#ccfafe")',
  borderColor: '#ccfafe #ccfafe hsl(185, 100%, 85%)',
  color: '#333',

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
