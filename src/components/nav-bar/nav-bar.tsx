import React from 'react';
import './nav-bar.css'

class navBar extends React.Component {

    render() {
        return (
            <div className="top-bar">
                <i className="fas fa-bars"></i>
                <div className="to-do-text">To Do</div>
                <div className="search-box">
                    <i className="fas fa-search"></i>
                </div>
                <i className="fas fa-cog"></i>
                <i className="fas fa-question"></i>
                <i className="far fa-comment-alt"></i>
                <i className="far fa-user-circle"></i> 
            </div>
        );
    }
}

export default navBar;