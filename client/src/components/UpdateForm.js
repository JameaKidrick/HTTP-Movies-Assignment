import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {
  const [movie , setMovie] = useState([])
  const [updateMovie, setUpdateMovie] = useState({id: props.match.params.id, title: '', director: '', metascore: 0, stars: ''})

  const fetchMovie = () => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(response => {
        setMovie(response.data)
      })
  }

  const Update = () => {
    const stars = updateMovie.stars.split(',');
    const newMovie = {...updateMovie, stars}
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, newMovie)
      .then(response => {
        setUpdateMovie({title: '', director: '', metascore: 0, stars: ''})
        props.history.push("/");
      })
      .catch(error => {
        console.log(error)
      })
  }

  const Delete = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`, updateMovie)
      .then(response => {
        props.history.push("/");
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetchMovie();
  }, [])

  const handleChange = e => {
    setUpdateMovie({...updateMovie, [e.target.name]:e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault();
    Update(updateMovie)
  }

  return(
    <div>
      Hello UpdateForm!
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
        <button>Update</button>
      </form>
      <button onClick={() => Delete()}>Delete</button>
    </div>
  )
}

export default UpdateForm;