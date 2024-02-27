import React from 'react';
import ToDoList from '../components/ToDoList';
import '../pages/HomePage.css';

function HomePage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <ToDoList />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
