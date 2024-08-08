import React from 'react';
import PropTypes from 'prop-types';

class MenuIcon extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isActive: this.props.isMenu,
    };
  }

	render() {
		return (
      <div className='MenuBtn-container'>
        <div className={`MenuBtn ${this.state.isActive ? 'active' : ''}`} onClick={this.props.changeMenuBtn}> 
          <span className='MenuBtn-line1'></span>
          <span className='MenuBtn-line2'></span>
          <span className='MenuBtn-line3'></span>
        </div>
      </div>
		)
	}
}

MenuIcon.propTypes = {
	changeMenuBtn: PropTypes.func.isRequired,
  isMenu: PropTypes.bool.isRequired
};


export default MenuIcon
