import React from 'react';
import { connect } from 'react-redux';
import './categories.css';
import axios from 'axios';

class categories extends React.Component<{}, {categories: any, isLoaded: boolean}> {

  async componentDidMount() {
    let properties: any = this.props;
    properties.getCategories()
  }

  render() {
    let properties: any = this.props;
    let { isLoaded, categories, currentCategory } = properties;
    if(!isLoaded) {
      return(
        <div>Loading...</div>
      )
    } else {
      let categoriesCount = categories.length;
      return (
        <div className="category-container">
          <ul id="category-list" className="category-list-container">
            {categories.map((item: any) => {
              return(
                <li onClick={() => properties.setCurrentCategory(item)}
                  className={currentCategory._id == item._id ? "list-element current-element": "list-element"}>
                  <i className={item.icon}></i>{item.name}
                </li>
              )
            })}
          </ul>
          <div className="category-input-container">
            <i className="fas fa-plus"></i>
            <input id="category-input" className="category-input" placeholder="New List" 
              type="text" onKeyPress={(event) => properties.updateCategories(event, categoriesCount + 1)}>
            </input>
          </div>
          <div className="bottom-icons-container">
            <i className="far fa-envelope bottom-icon"></i>
            <i className="far fa-calendar-alt bottom-icon"></i>
            <i className="fas fa-user-friends bottom-icon"></i>
            <i className="fas fa-paperclip bottom-icon"></i>
            <i className="fas fa-check bottom-icon"></i>
          </div>
      </div>
      );
    }
  }
}

const dispatcher = (dispatch: any) => {
    return {
        getCategories: () => {
          dispatch({type: "GET_CATEGORIES"})
        },
        updateCategories: async (event: any, idCount: Number) => {
            if(event.key === "Enter") {
                let categoryObject = {
                    name: event.target.value,
                    id: "category-" + idCount,
                    icon: "fas fa-list-ul"
                };
                event.target.value = "";
                dispatch({
                    type: 'UPDATE_CATEGORIES',
                    value: categoryObject
                })
            }
        },
        setCurrentCategory: (categoryObject: any) => {
           dispatch({
             type: 'SET_CURRENT_CATEGORY',
             value: categoryObject,
             isFullWidth: true
           })
        } 
    }
}

const mapStateToProps = (state: any) => {
  return {
    categories: state.categories,
    currentCategory: state.currentCategory,
    isLoaded: state.isLoaded,
    categoryCount: state.categoryCount
  }
}

export default connect(mapStateToProps, dispatcher)(categories)