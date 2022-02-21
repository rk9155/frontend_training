import React from "react";
import 'antd/dist/antd.css';
import { Card } from 'antd';

const { Meta } = Card;

const Movie = (props) => {
  const { Title, Year, imdbID, Poster } = props.movie;

  return (
    <Card style={{width: '400px'}}
      onClick={() => {
        props.onMovieSelect(imdbID);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      <Card 
          cover={<img alt={Title} src={Poster} />}>
          <Meta title={Title} description= {<span>Year : {Year} More Details</span>}
          />
      </Card>
    </Card>
  );
};
export default Movie;