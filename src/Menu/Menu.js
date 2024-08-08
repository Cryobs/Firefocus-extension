import React from 'react';

import PropTypes from 'prop-types';

import SettingsIcon from '../icons/SettingsIcon';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isActive: this.props.isMenu,
        };
      }

    ClearPomodoros(){
        browser.runtime.sendMessage({ command: "ClearPomodoros" }, () => {});
        
    }

    ClearTasks(){
        browser.runtime.sendMessage({ command: "ClearTasks" }, () => {});
        
    }

    OpenSettings(){
        const settings = document.querySelector(".content-settings");
        const content = document.querySelector(".content-default");
    
        if(!settings.classList.contains("active")){
            settings.classList.add("active");
            content.classList.remove("active");
        } else {
            return;
        }
      }

    render(){
        return (
            <div className="Menu-container" onClick={this.props.changeMenuBtn}>
                <div className='Menu glass'>
                    <div className='Menu-Settings choice' onClick={this.OpenSettings}>
                        <SettingsIcon />
                        Settings
                    </div>
                    <div className='Menu-ClearPomodoros choice' onClick={this.ClearPomodoros}>
                    <svg className='Menu-doneIcon' width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.50004 17.4166C13.8723 17.4166 17.4167 13.8722 17.4167 9.49998C17.4167 5.12773 13.8723 1.58331 9.50004 1.58331C5.12779 1.58331 1.58337 5.12773 1.58337 9.49998C1.58337 13.8722 5.12779 17.4166 9.50004 17.4166Z" stroke="white" strokeWidth="1.5625"/>
                        <path d="M6.72925 9.89581L8.31258 11.4791L12.2709 7.52081" stroke="white" strokeWidth="1.5625" strokeLinecap="round" strokeLinejoin="round"/>
                        <defs>
                            <clipPath id="clip0_67_187">
                                <rect width="19" height="19" fill="white"/>
                            </clipPath>
                        </defs>
                    </svg>
                        Clear Pomodoros
                    </div>
                    <div className='Menu-ClearTasks choice' onClick={this.ClearTasks}>
                        <svg className='Menu-delIcon' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.0833 5H2.91663M15.6941 7.08333L15.3108 12.8333C15.1633 15.045 15.09 16.1508 14.3691 16.825C13.6483 17.5 12.5391 17.5 10.3225 17.5H9.67746C7.46079 17.5 6.35163 17.5 5.63079 16.825C4.90996 16.1508 4.83579 15.045 4.68913 12.8333L4.30579 7.08333M7.91663 9.16667L8.33329 13.3333M12.0833 9.16667L11.6666 13.3333" stroke="white" strokeWidth="1.25" strokeLinecap="round"/>
                            <path d="M5.41663 5H5.50829C5.84366 4.99143 6.16864 4.88185 6.44073 4.68559C6.71281 4.48934 6.91934 4.21553 7.03329 3.9L7.06163 3.81417L7.14246 3.57167C7.21163 3.36417 7.24663 3.26083 7.29246 3.1725C7.38263 2.99949 7.51205 2.84999 7.67036 2.73597C7.82866 2.62194 8.01146 2.54655 8.20413 2.51583C8.30163 2.5 8.41079 2.5 8.62913 2.5H11.3708C11.5891 2.5 11.6983 2.5 11.7958 2.51583C11.9885 2.54655 12.1713 2.62194 12.3296 2.73597C12.4879 2.84999 12.6173 2.99949 12.7075 3.1725C12.7533 3.26083 12.7883 3.36417 12.8575 3.57167L12.9383 3.81417C13.0439 4.16523 13.2623 4.47167 13.5597 4.68605C13.8571 4.90043 14.2168 5.01077 14.5833 5" stroke="white" strokeWidth="1.25"/>
                        </svg>
                        Clear Tasks
                    </div>
                    
                </div>
            </div>
          );
    }

}

Menu.propTypes = {
	changeMenuBtn: PropTypes.func.isRequired,
    isMenu: PropTypes.bool.isRequired,
};


export default Menu;
