import React from 'react';
import PropTypes from 'prop-types';

class DownIcon extends React.Component {
    render(){
        return (
            <div className='Down-icon' >
                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.props.onClick}>
                    <path d="M6.14152 6.52917L11.4999 1.00417C11.834 0.658333 11.6315 0 11.1915 0H0.474851C0.0348511 0 -0.167649 0.658333 0.166518 1.00417L5.52485 6.52917C5.70235 6.7125 5.96402 6.7125 6.14152 6.52917Z" fill="white"/>
                </svg>
            </div>
          );
    }
}

DownIcon.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default DownIcon;