import React from 'react';
import { connect } from 'react-redux';
import './tasks.css';

class tasks extends React.Component<{}, {tasks: any, isLoaded: boolean}> {

  constructor(props: any) {
    super(props);
    this.state = {
      tasks: [],
      isLoaded: false
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
                onClick={() => properties.toggleCompleted(item, currentCategory._id, isFullwidth)}></i>
                <div className="task-content" onClick={() => properties.setCurrentTask(item)}>{item.name}</div>
                <i className={item.isImportant ? "fas fa-star" : "far fa-star"} 
                onClick={() => properties.toggleImportant(item, currentCategory._id, isFullwidth)}></i>
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
            dispatch({
                type: 'ADD_TASK',
                value: taskObject,
                id: categoryId
            })
          }
        },
        toggleCompleted: (taskObject: any, categoryId: any, isFullwidth: Boolean) => {
          taskObject.isCompleted = !taskObject.isCompleted; 
          dispatch({
            type: 'UPDATE_TASK',
            value: taskObject,
            id: categoryId,
            isFullwidth: isFullwidth
          })
        },
        toggleImportant: (taskObject: any, categoryId: any, isFullwidth: Boolean) => {
          taskObject.isImportant = !taskObject.isImportant;
          dispatch({
            type: 'UPDATE_TASK',
            value: taskObject,
            id: categoryId,
            isFullwidth: isFullwidth
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