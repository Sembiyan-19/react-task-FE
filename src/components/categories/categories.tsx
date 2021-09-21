import React from 'react';
import { connect } from 'react-redux';
import './categories.css';
import axios from 'axios';

class categories extends React.Component<{}, {categories: any, isLoaded: boolean}> {

  async getCategories(type: any) {
    let properties: any = this.props;
    await axios.get('http://localhost:8003/categories')
    .then(res => res.data)
    .then(json => {
        properties.setCategory(json.data, type)
    })
  }

  async componentDidUpdate() {
    let properties: any = this.props;
    if(properties.isCategoriesChanged) {
      await this.getCategories("SET_CATEGORIES");
    }
  }

  async componentDidMount() {
    await this.getCategories("SET_CATEGORIES_INITIALLY");
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
              type="text" onKeyPress={(event) => properties.createCategory(event, categoriesCount + 1)}>
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
        createCategory: async (event: any, idCount: Number) => {
            if(event.key === "Enter") {
                let categoryObject = {
                    name: event.target.value,
                    id: "category-" + idCount,
                    icon: "fas fa-list-ul"
                };
                event.target.value = "";
                let createdObject = await axios.post("http://localhost:8003/categories", categoryObject)
                dispatch({
                    type: 'ADD_CATEGORY',
                    value: createdObject.data
                })
            }
        },
        setCategory: (categoryObject: any, type: any) => {
          dispatch({
              type: type,
              value: categoryObject
          })
        },
        setCurrentCategory: (categoryObject: any) => {
           dispatch({
             type: 'SET_CURRENT_CATEGORY',
             value: categoryObject
           })
        } 
    }
}

const mapStateToProps = (state: any) => {
  return {
    isCategoriesChanged: state.isCategoriesChanged,
    categories: state.categories,
    currentCategory: state.currentCategory,
    isLoaded: state.isLoaded,
    categoryCount: state.categoryCount
  }
}

export default connect(mapStateToProps, dispatcher)(categories)