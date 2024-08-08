import React from 'react';
import PropTypes from 'prop-types';

class TimerStats extends React.Component {
  render() {
    return (
      <div className="TimerStats">
        <div className="cycle">
          # {this.props.cycle}
        </div>
        <div className="allTime">
          {this.props.allTime}
        </div>
      </div>
    );
  }
}

// Определение propTypes для валидации пропсов
TimerStats.propTypes = {
  cycle: PropTypes.number.isRequired,
  allTime: PropTypes.number.isRequired,
};

export default TimerStats;
