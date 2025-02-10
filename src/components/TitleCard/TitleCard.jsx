import React, { useEffect, useState } from 'react';
import './TitleCard.css';
import cards_data from '../../assets/cards/Cards_data';
import { Link } from 'react-router-dom';

const TitleCard = ({ title, category }) => {

  const [apidata, setApidata] = useState([]);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOGJkNmQ4YzFmZWI3Y2I4OWY4MjQyZTc5OWU4MzhiNCIsIm5iZiI6MTczOTE1NzM4MS4zNTEsInN1YiI6IjY3YTk2Zjg1OGI3MThiNjZjNTBmNzEwOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1V2XIlaqDn8Ph8VVInWGNcTjfeaOjPOjNI5QyjNZOD0'
    }
  };


  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApidata(res.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list">
        {apidata.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>;
        })}
      </div>
    </div>
  );
};

export default TitleCard;