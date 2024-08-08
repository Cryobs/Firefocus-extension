import React from 'react';


class SettingsIcon extends React.Component {
    render(){
        return (
            <div className='Settings-icon'>
                <svg className='Settings-svg' width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.03583 2.5317C6.72667 1.51085 7.57167 1 8.5 1C9.42833 1 10.2733 1.51 11.9642 2.5317L12.5358 2.8768C14.2267 3.8985 15.0717 4.40935 15.5358 5.25C16 6.0915 16 7.1115 16 9.1549V9.8451C16 11.8877 16 12.9094 15.5358 13.75C15.0717 14.5915 14.2267 15.1015 12.5358 16.1224L11.9642 16.4683C10.2733 17.4892 9.42833 18 8.5 18C7.57167 18 6.72667 17.49 5.03583 16.4683L4.46417 16.1224C2.77333 15.1024 1.92833 14.5907 1.46417 13.75C1 12.9085 1 11.8885 1 9.8451V9.1549C1 7.1115 1 6.09065 1.46417 5.25C1.92833 4.4085 2.77333 3.8985 4.46417 2.8768L5.03583 2.5317Z" stroke="white" strokeWidth="1.75"/>
                  <circle cx="50%" cy="50%" r="3" stroke="white" strokeWidth="1.75" fill="none" />
                </svg>
            </div>
          );
    }
}

export default SettingsIcon;
