import React from 'react';
import DoneIcon from '../icons/DoneIcon';
import PropTypes from 'prop-types';

class Task extends React.Component {
    render(){
        return (
            <div className={`Task-container glass ${this.props.done}`}>
                <div className='TaskInfo'>
                    <DoneIcon />
                    <p className='TaskText'>{this.props.taskName}</p>
                </div>

                <div className='progressText-container'>
                    <p className='progressText'><span className='rangeDone'>{this.props.rangeDone}</span>/<span className='taskRange'>{this.props.taskRange}</span></p>
                </div>
            </div>
          );
    }

}

Task.propTypes = {
	taskName: PropTypes.string.isRequired,
    rangeDone: PropTypes.number.isRequired,
    taskRange:  PropTypes.number.isRequired,
    done: PropTypes.string.isRequired
};

export default Task;
