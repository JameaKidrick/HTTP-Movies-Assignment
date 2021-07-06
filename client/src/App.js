import React, { useState } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateForm from './components/UpdateForm';
import AddForm from './components/AddForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        exact path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route 
        exact path='/update-movie/:id' 
        render={props => {
          return <UpdateForm {...props} />;
        }}
      />
      <Route 
        exact path='/add-movie' 
        render={props => {
          return <AddForm {...props} />;
        }}
      />
    </>
  );
};

export default App;
