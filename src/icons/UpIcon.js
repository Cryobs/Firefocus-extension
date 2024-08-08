import React from 'react';
import PropTypes from 'prop-types';

class UpIcon extends React.Component {
    render(){
        return (
            <div className='Up-icon' >
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={this.props.onClick}>
                    <path d="M6.30839 0.80418L11.6667 6.32918C12.0009 6.67418 11.7984 7.33335 11.3584 7.33335H0.641721C0.201721 7.33335 -0.000779033 6.67501 0.333388 6.32918L5.69172 0.80418C5.7307 0.761099 5.77828 0.726666 5.83139 0.7031C5.8845 0.679534 5.94195 0.667358 6.00005 0.667358C6.05816 0.667358 6.11561 0.679534 6.16872 0.7031C6.22182 0.726666 6.2694 0.761099 6.30839 0.80418Z" fill="white"/>
                </svg>
            </div>
          );
    }
}

UpIcon.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default UpIcon;
