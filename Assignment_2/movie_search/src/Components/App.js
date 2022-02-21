import React, { useState } from "react";
import Movie from "./Movie";
import MovieInfo from "./Movie_info";
import { Pagination } from 'antd';

function App() {
  const [Name, updateName] = useState("");
  const [Year, updateYear] = useState("");
  const [Result, updateResult] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [total,setTotal] = useState("");
  const [page,setPage] = useState(1);
  const [postPerPage,setPostPerPage] = useState(4);


  const searchMovie = async (e) => {
          e.preventDefault();
          const url = `https://www.omdbapi.com/?s=${Name}&y=${Year}&apikey=2ca2d775`;
          const res = await fetch(url);
          const data = await res.json();
          updateResult(data.Search);

          setTotal(data.Search.length);
  };

  const indexLastPage = page + postPerPage;
  const indexFirstPage = indexLastPage -postPerPage;
  const current = Result.slice(indexFirstPage,indexLastPage);

  return (
    <div className="container">
      <div className="header">
          Search Movie (Name/Year)...
      </div>
      <div className="search_div">
        <form className="form" onSubmit={searchMovie}>
          <div className="search_bar">
            <div className="search">
              <input className="input" type="text" placeholder="Movie Name" name="query" 
                     value = {Name} onChange={(e) => updateName(e.target.value)}></input>
            </div>
            <div className="search">
              <input className="input" type="text" placeholder="Movie Year" name="query"
                     value = {Year} onChange={(e) => updateYear(e.target.value)}></input>
            </div>
            <button className="btn btn-primary" type="submit" >Submit</button>
          </div>
        </form>
      </div>
      
      {selectedMovie && <MovieInfo selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}

      <div className="results">
        {Result.map((movie, index) => (
            <Movie key={index} movie={movie} onMovieSelect={onMovieSelect} />
          ))}
      </div>
      <Pagination 
       onChange={(value) => setPage(value)}
       pageSize={postPerPage}
       total = {total}
       current = {page}
      />
    </div>
  );
}

export default App;
