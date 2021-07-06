import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

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
    <div  style={{width:'50%', margin: '0 auto'}}>
      <h3 style={{textAlign:'center'}}>Add a Movie</h3>
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
        <Button color="success" style={{width: '10%', marginLeft: '422px'}}>Add</Button>
      </Form>
    </div>
  )
}

export default AddForm;