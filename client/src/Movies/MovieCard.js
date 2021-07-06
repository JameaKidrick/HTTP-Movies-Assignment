import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const MovieCard = (props) => {
  const { title, director, metascore, stars } = props.movie;
  return (
    <div style={{color:'black'}}>
      <Card className="movie-card" style={{width:"35%"}}>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>
            <small className="text-muted movie-director">Director: <em>{director}</em></small>
          </CardText>
          <CardText className="movie-metascore">Metascore: <strong>{metascore}</strong></CardText>
          <CardText>Actors</CardText>
          <CardText>
            <small>
            {stars.map(star => (
              <div key={star} className="movie-star">
                {star}
              </div>
            ))}
            </small>
          </CardText>
        </CardBody>
      </Card>
    </div>
  );
};

export default MovieCard;
