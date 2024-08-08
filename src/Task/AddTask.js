import React from 'react';
import AddIcon from '../icons/AddIcon';
import PropTypes from 'prop-types';


class AddTask extends React.Component {
    render(){
        return (
            <div className='AddTask-container glass' onClick={this.props.addTask}>  
                <AddIcon />
                <p>Add Task</p>
            </div>
          );
    }

}

AddTask.propTypes = {
	addTask: PropTypes.func.isRequired,
  };

export default AddTask;
