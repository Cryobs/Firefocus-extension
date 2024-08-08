import React from 'react';
import DownIcon from '../icons/DownIcon';
import UpIcon from '../icons/UpIcon';

import PropTypes from 'prop-types';

class TaskMenu extends React.Component {
    constructor(props) {
        super(props);
        this.AddInput = this.AddInput.bind(this);
        this.MinusInput = this.MinusInput.bind(this);
        this.CheckValid = this.CheckValid.bind(this);
        this.SendForm = this.SendForm.bind(this);
        this.DeleteTask = this.DeleteTask.bind(this);
    }

    componentDidMount(){
        this.props.renderTasks();
    }

    AddInput(){
        const input = document.querySelector(".Counter");
        if(input.value < 99 ){
            input.value = Number(input.value) + 1;
        }
        console.log("Add", input.value);
    }

    MinusInput(){
        const input = document.querySelector(".Counter");
        if(input.value > 1 ){
            input.value = Number(input.value) - 1;
        }
        console.log("Minus", input.value);
    }

    CheckValid(event){
        const input = event.target;
        input.value = input.value.replace(/\D/g, ''); //remove all strings symbols
        if(input.value > 99){
            input.value = 99;
        }
    }

    SendForm(event){
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());

        if(form.taskName.value === ""){
            return;
        } else if(form.taskRange.value === "" || form.taskRange.value < 1){
            return;
        }
        this.props.OpenMenuTask();

        console.log("Send Form");
        console.log("index: ", form.taskIndex.value);

        form.taskName.value = "";
        form.taskRange.value = "1";
        form.taskIndex.value = "";
        
        browser.runtime.sendMessage({ command: "TaskForm", form: formObject }, () => {
            console.log("TaskForm FRONTEND");
            this.props.renderTasks();
          });
    }   

    DeleteTask(){
        this.props.OpenMenuTask();
        const index = Number(document.querySelector(".taskIndex").value);

        browser.runtime.sendMessage({ command: "DeleteTask", index: index }, () => {
            console.log("DeleteTask FRONTEND");
            this.props.renderTasks();
          });
    }
    

    

    render(){
        return (
            <div className='TaskMenu-container glass'>
                <form className='TaskForm' onSubmit={this.SendForm}>
                    <input name="taskName" className='TaskName' placeholder='What are you working on?'></input>
                    <p>Pomodoros</p>
                    <div className='Counter-container'>
                        <input type="hidden" name="taskIndex" className='taskIndex' defaultValue=""/>
                        <input name="taskRange" className='Counter' defaultValue="1" onChange={this.CheckValid} />
                        <div className='PlusBtn glass' onClick={this.AddInput}><UpIcon /></div>
                        <div className='MinusBtn glass' onClick={this.MinusInput}><DownIcon /></div>
                    </div>
    
                    
                    <footer className='glass'>
                        <div className='DeleteContainer'>
                            <div className='DeleteBtn Btn' onClick={this.DeleteTask}>Delete</div>
                        </div>
                        <div className='CancelBtn Btn' onClick={this.props.OpenMenuTask}>Cancel</div>
                        <input name="save" type='submit' value="Save" className='SaveBtn glass Btn'/>
                    </footer>
                </form>
            </div>
          );
    }

}

TaskMenu.propTypes = {
	OpenMenuTask: PropTypes.func.isRequired,
    renderTasks: PropTypes.func.isRequired
};

export default TaskMenu;
