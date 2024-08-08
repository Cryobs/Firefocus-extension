import React from 'react';
import PropTypes from 'prop-types';

class RefreshIcon extends React.Component{

	render() {
		return (
            <div>
                <div className='refreshIcon-container'>
                    <div onClick={this.props.onClick}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.0075 4C6.70338 4 4 6.70338 4 10.0075C4 13.3116 6.70338 16.015 10.0075 16.015C11.6596 16.015 13.1915 15.3692 14.2728 14.2728L13.1915 13.1915C12.3805 14.0025 11.2541 14.5131 9.99249 14.5131C7.49937 14.5131 5.48686 12.5006 5.48686 10.0075C5.48686 7.51439 7.49937 5.50188 9.99249 5.50188C11.239 5.50188 12.3204 6.04255 13.1314 6.86859L11.4944 8.50563H16V4L14.2128 5.78723C13.1314 4.70588 11.6446 4 9.99249 4H10.0075Z" fill="black"/>
                        </svg>
                    </div>
                </div>
            </div>
        )
	}
}

RefreshIcon.propTypes = {
	onClick: PropTypes.func.isRequired
};

export default RefreshIcon
