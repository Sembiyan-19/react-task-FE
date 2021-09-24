import React from 'react';
import { connect } from 'react-redux';
import './steps.css';
import axios from 'axios';

class steps extends React.Component<{}, {tasks: any, isLoaded: boolean}> {

  constructor(props: any) {
    super(props);
    this.state = {
      tasks: [],
      isLoaded: false
    }
  }

  // async componentDidUpdate() {
  //   let properties: any = this.props;
  //   if(properties.isStepsChanged) {
  //     await axios.get('http://localhost:8003/tasks/' + properties.currentTask._id)
  //     .then(res => res.data)
  //     .then(json => {
  //       properties.setCurrentTask(json)
  //     })
  //   }
  // }

  render() {
    let properties: any = this.props;
    let { currentTask }  = properties;
    let isLoaded = true;
    let stepsList;
    if(currentTask.steps) {
      console.log(currentTask)
      stepsList = <ul id="steps-list" className="steps-list-container">
                  {currentTask.steps.map((item: any) => {
                    return(
                      <li className="step-element">
                        <i className="far fa-circle"></i>
                        <div className="step-content">{item}</div>
                      </li>
                    )
                  })}
                </ul>
    }
    if(!isLoaded) {
      return(
        <div>Loading</div>
      )
    } else {
      return (
        <div id="steps-container" className="steps-container">
            <div className="steps-head-container">
                <div id="steps-header" className="steps-head-element">
                  <i className={currentTask.isCompleted ? "fas fa-check-circle" : "far fa-circle"}></i>
                  <h4 className="task-heading">{currentTask.name}</h4>
                  <i className={currentTask.isImportant ? "fas fa-star" : "far fa-star"}></i>
                </div>
                {stepsList}
                <div className="step-input-container">
                    <i id="add-step-icon" className="fas fa-plus"></i>
                    <input id="step-input" className="step-input" placeholder="Add step"
                      onKeyPress={(event) => properties.createStep(event, currentTask)}
                    ></input>
                <div className="hide-add-button add-step-button" id="add-step-button">ADD</div>
            </div>
        </div>
        <div className="other-option">
            <i className="far fa-sun"></i>
            <span id="add-to-my-day">Add to my day</span>
        </div>
        <div className="option-container">
            <div className="option-element">
                <i className="far fa-bell"></i>
                <span>Remaind me</span>
            </div>
            <div className="option-element">
                <i className="far fa-calendar-alt"></i>
                <span>Add due date</span>
            </div>
            <div className="option-element">
                <i className="far fa-clock"></i>
                <span>Repeat</span>
            </div>
        </div>
        <div className="other-option">
          <i className="far fa-sun"></i>
          <span>Pick a category</span>
        </div>
        <div className="other-option">
          <i className="far fa-sun"></i>
          <span>Add file</span>
        </div>
      </div>
      );
    }
  }
}

const dispatcher = (dispatch: any) => {
    return {
      createStep: async (event: any, taskObject: any) => {
        if(event.key === "Enter") {
          taskObject.steps.push(event.target.value)
          event.target.value = ""
          dispatch({
              type: 'UPDATE_STEP',
              value: taskObject
          })
        }
      }
      // setCurrentTask: (taskObject: any) => {
      //   dispatch({
      //     type: 'SET_CURRENT_TASK',
      //     value: taskObject
      // })
      // }
    }
}

const mapStateToProps = (state: any) => {
  return {
    currentTask: state.currentTask,
    isStepsChanged: state.isStepsChanged
  }
}

export default connect(mapStateToProps, dispatcher)(steps)