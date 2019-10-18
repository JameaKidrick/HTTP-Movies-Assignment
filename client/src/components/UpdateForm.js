import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label } from 'reactstrap';

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
      .then(() => {
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
      .then(() => {
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
    <div  style={{width:'50%', margin: '0 auto'}}>
      <h3 style={{textAlign:'center'}}>{`Update: ${movie.title}`}</h3>
      <Form onSubmit={handleSubmit}>
        <FormGroup style={{display:'flex', flexDirection:'column', width:'30%', margin:'3% auto'}}>
          <Label for="exampleEmail">Title</Label>
          <input 
            name='title'
            type='text'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup style={{display:'flex', flexDirection:'column', width:'30%', margin:'3% auto'}}>
          <Label for="exampleEmail">Director</Label>
          <input 
            name='director'
            type='text'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup style={{display:'flex', flexDirection:'column', width:'30%', margin:'3% auto'}}>
          <Label for="exampleEmail">Metascore</Label>
          <input 
            name='metascore'
            type='text'
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup style={{display:'flex', flexDirection:'column', width:'30%', margin:'3% auto'}}>
          <Label for="exampleEmail">Actor(s)</Label>
          <p style={{fontSize:'10px'}}>Please separate actors with a comma</p>
          <input 
            name='stars'
            type='text'
            onChange={handleChange}
          />
        </FormGroup>
        <div style={{marginLeft: '335px'}}>
          <Button color="warning" style={{marginRight: '10px'}}>Edit</Button>
          <Button color="danger" onClick={() => Delete()}>Delete</Button>
        </div>
      </Form>
    </div>
  )
}

export default UpdateForm;