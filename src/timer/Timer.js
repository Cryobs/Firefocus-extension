import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component{
	render() {
		return (
			<div className="Timer">
                {this.props.time}
			</div>
		);
	}
}

Timer.propTypes = {
	time: PropTypes.number.isRequired,
  };

export default Timer
