import React from 'react';
import { connect } from 'react-redux';
import './tasks.css';
import axios from 'axios';

class tasks extends React.Component<{}, {tasks: any, isLoaded: boolean}> {

  constructor(props: any) {
    super(props);
    this.state = {
      tasks: [],
      isLoaded: false
    }
  }

  async componentDidUpdate() {
    let properties: any = this.props;
    if(properties.isTasksChanged) {
      await axios.get('http://localhost:8003/categories/' + properties.currentCategory._id)
      .then(res => res.data)
      .then(json => {
        properties.setCurrentCategory(json)
      })
    }
  }

  render() {
    let properties: any = this.props;
    let { isLoaded, currentCategory, isFullwidth }  = properties;
    if(!isLoaded) {
      return(
        <div>Loading</div>
      )
    } else {
        let tasksComp;
        let tasksCount: any;
        if(currentCategory.tasks) {
            tasksCount = currentCategory.tasks.length;
            tasksComp = currentCategory.tasks.map((item: any) => {
            return(
              <li className="task-element" >
                <i className={item.isCompleted ? "fas fa-check-circle" : "far fa-circle"}
                onClick={() => properties.toggleCompleted(item)}></i>
                <div className="task-content" onClick={() => properties.setCurrentTask(item)}>{item.name}</div>
                <i className={item.isImportant ? "fas fa-star" : "far fa-star"} 
                onClick={() => properties.toggleImportant(item)}></i>
              </li>
            )
          })
        }
      return (
        <div className={isFullwidth ? "tasks-container full-width" : "tasks-container half-width"} id="tasks-container">
            <h3 id="tasks-heading" className="category-name">{currentCategory.name}</h3>
            <div className="task-input-container">
                <i id="add-task-icon" className="fas fa-plus"></i>
                <input id="task-input" className="task-input" 
                  onKeyPress={(event) => properties.createTask(event, currentCategory._id)}
                  placeholder="Add a task">
                </input>
                <div className="hide-add-button add-task-button" id="add-button">ADD</div>
            </div>
            <ul id="task-list" className="tasks-list-container">
              {tasksComp}
            </ul>
        </div>
      );
    }
  }
}

const dispatcher = (dispatch: any) => {
    return {
        setCurrentCategory: (categoryObject: any) => {
          dispatch({
            type: 'SET_CURRENT_CATEGORY',
            value: categoryObject
          })
        } ,
        setCurrentTask: (taskObject: any) => {
            dispatch({
                type: 'SET_CURRENT_TASK',
                value: taskObject
            })
        },
        createTask: async (event: any, categoryId: any) => {
          if(event.key === "Enter") {
            let taskObject = {
                name: event.target.value,
                isCompleted: false,
                isImportant: false,
                steps: [],
                id: categoryId
            };
            event.target.value = "";
            await axios.post("http://localhost:8003/tasks", taskObject);
            dispatch({
                type: 'ADD_TASK',
                value: taskObject
            })
          }
        },
        toggleCompleted: (taskObject: any) => {
          taskObject.isCompleted = !taskObject.isCompleted; 
          dispatch({
            type: 'UPDATE_TASK',
            value: taskObject,
            isStepsChanged: false
          })
        },
        toggleImportant: (taskObject: any) => {
          taskObject.isImportant = !taskObject.isImportant;
          dispatch({
            type: 'UPDATE_TASK',
            value: taskObject,
            isStepsChanged: false
          })
        } 
    }
}

const mapStateToProps = (state: any) => {
  return {
    isTasksChanged: state.isTasksChanged,
    currentCategory: state.currentCategory,
    currentTask: state.currentTask,
    isLoaded: state.isLoaded,
    isFullwidth: state.isFullwidth
  }
}

export default connect(mapStateToProps, dispatcher)(tasks)