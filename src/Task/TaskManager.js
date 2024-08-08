import React from 'react';
import AddTask from './AddTask';
import TaskMenu from './TaskMenu';
import Task from './Task';
import RefreshIcon from '../icons/RefreshIcon';

class TaskManager extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            components: []
        }
        
        this.RenderTasks = this.RenderTasks.bind(this);
        this.GetTask = this.GetTask.bind(this);
    }
    render(){
        return (
            <div className='TaskManager-container'>
                <div className='header' >
                    <p>Tasks</p>

                    <RefreshIcon onClick={this.RenderTasks}/>
                    
                    <div className='addBtn-container'>
                        <span className='addBtn' onClick={this.OpenMenuTask}>
                            <span className='line1'></span>
                            <span className='line2'></span>
                        </span>
                    </div>
                </div>
                <TaskMenu renderTasks={this.RenderTasks} OpenMenuTask={this.OpenMenuTask}/>
                <div className='content'>
                    <div className='Tasks'>
                    {this.state.components.map((component, index) => (
                        
                        <div key={index} onClick={() => {this.GetTask(index, event)}}>{component}</div>
                    ))}
                    </div>
                    <AddTask addTask={this.OpenMenuTask}/>
                </div>
                
            </div>
          );
    }


    GetTask(index, event){
        console.log(event.target)
        console.log('Clicked component index:', index);
        if(event.target.className === "doneIcon" || event.target.className === "line2" || event.target.className === "line1"){
            console.log("Done")
            this.DoneTask(index);
        } else {
            console.log("components: ",this.state.components);
            const name = this.state.components[index].props.taskName;
            const range = this.state.components[index].props.taskRange;
            this.OpenMenuTask(name,range,index);
        }

    }
    
    componentDidMount() {
        browser.runtime.onMessage.addListener((message) => {
          if (message.command === "tasksUpdated") {
            this.RenderTasks();
          }
        });
      }

    DoneTask(index){
        this.setState({components: []});
        browser.runtime.sendMessage({ command: "DoneTask", index: index}, (response) => {
            for(let i = response.length - 1; i >= 0; i--){
                this.setState((prevState) => ({
                    components: [
                      ...prevState.components,
                      <Task done={response[i].done ? "done" : ""} key={prevState.components.length} taskName={response[i].name} rangeDone={response[i].rangeDone} taskRange={response[i].range}/>
                    ]
                  }));
            }
        });
    }

    RenderTasks(){
        this.setState({components: []});
        browser.runtime.sendMessage({ command: "renderTasks"}, (response) => {
            console.log("remder responce: ", response)
            for(let i = response.length - 1; i >= 0; i--){
                console.log(i)
                this.setState((prevState) => ({
                    components: [
                      ...prevState.components,
                      <Task done={response[i].done ? "done" : ""} key={prevState.components.length} taskName={response[i].name} rangeDone={response[i].rangeDone} taskRange={response[i].range}/>
                    ]
                  }));
            }
        });
    }


    OpenMenuTask(name, range, index){
        console.log("open index: ", index)
        const addTask = document.querySelector(".TaskMenu-container");
        if(addTask.classList.contains("active")){
            addTask.classList.remove("active");
        } else {
            addTask.classList.add("active");
            const form = addTask.querySelector(".TaskForm");
            form.taskName.value = "";
            form.taskRange.value = "1";
            form.taskIndex.value = "";
            if(arguments.length === 3){
                form.taskName.value = name;
                form.taskRange.value = range;
                form.taskIndex.value = "" + index;
                console.log(form.taskIndex.value)
            }
        }
    }

}

export default TaskManager;
