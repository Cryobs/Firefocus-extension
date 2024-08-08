import React from "react"
import PropTypes from 'prop-types';

class PeriodTimer extends React.Component{
	render() {
		return (
			<div className="PeriodTimer">
                {this.props.stateTimer}
			</div>
		)
	}
}

PeriodTimer.propTypes = {
	stateTimer: PropTypes.string.isRequired
};

export default PeriodTimer
