import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddForm = props => {
  const [movie , setMovie] = useState([])
  const [addMovie, setAddMovie] = useState({id: props.match.params.id, title: '', director: '', metascore: 0, stars: ''})

  const fetchMovie = () => {
    axios
      .get(`http://localhost:5000/api/movies`)
      .then(response => {
        setMovie(response.data)
      })
  }

  const Add = () => {
    const stars = addMovie.stars.split(',');
    const newMovie = {...addMovie, stars}
    axios
      .post(`http://localhost:5000/api/movies`, newMovie)
      .then(() => {
        setAddMovie({title: '', director: '', metascore: 0, stars: ''})
        props.history.push("/");
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    fetchMovie();
  }, [])

  const handleChange = e => {
    setAddMovie({...addMovie, [e.target.name]:e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    Add(addMovie)
  }

  return(
    <div>
      Hello AddForm!
      <form onSubmit={handleSubmit}>
        <input 
          name='title'
          type='text'
          placeholder='Title'
          onChange={handleChange}
        />
        <input 
          name='director'
          type='text'
          placeholder='Director'
          onChange={handleChange}
        />
        <input 
          name='metascore'
          type='text'
          placeholder='Metascore'
          onChange={handleChange}
        />
        <input 
          name='stars'
          type='text'
          placeholder='First Actor'
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  )
}

export default AddForm;