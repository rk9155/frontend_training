import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Button} from 'antd';
import axios from 'axios';

import Movies from './Movies';

type MyProps = {
    message: any;
  };
type MyState = {
    movieName : string,
    movieYear : string,
    Result : any,
    loading : boolean,
    message: string
  };

class Search extends Component<MyProps, MyState>{
    cancel: any;
    
    constructor(props:MyProps) {
        super(props);
        this.state = {
            movieName : '',
            movieYear : '',
            Result : [],

            loading:false,
            message:''
        }

        this.cancel = '';

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    handleNameChange(e:React.FormEvent<HTMLInputElement>) {
        this.setState({movieName: e.currentTarget.value,loading: false,message:''},()=>this.fetchData)
    }
    handleYearChange(e:React.FormEvent<HTMLInputElement>) {
        this.setState({movieYear: e.currentTarget.value,loading: false,message:''},()=>this.fetchData)
    }
  
    fetchData = (e:any) => {

        this.setState({ loading: true });

        e.preventDefault();
        const url = `https://www.omdbapi.com/?s=${this.state.movieName}&y=${this.state.movieYear}&apikey=2ca2d775`;

        if( this.cancel ){
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(url,{
            cancelToken : this.cancel.token,
        })
        .then(res => {
            this.setState({
                loading: false,
                Result : res.data.Search,
            });
        })
        .catch(error => {
            if(axios.isCancel(error)|| error) {
                this.setState({
                    loading:false,
                    message:'Failed to fetch data from API..'
                })
            }
        })
    }

    loader(loading:boolean){
        if(this.state.loading){
          return (
            <Button type="primary" loading>
            Loading
          </Button>
          )
        }
    }

  render() {

    const { movieName, movieYear ,loading} = this.state;

    return (
    <div className="container">
      <div className="header">
          Search Movie (Name/Year)...
      </div>
      <div className="search_div">
        <form className="form" onSubmit={this.fetchData}>
          <div className="search_bar">
            <div className="search">
              <input className="input" type="text" placeholder="Movie Name" name="query" 
                     value={movieName} onChange={this.handleNameChange}></input>
            </div>
            <div className="search">
              <input className="input" type="text" placeholder="Movie Year" name="query" 
                     value={movieYear} onChange = {this.handleYearChange}></input>
            </div>
            <button className="btn btn-primary" type="submit" >Submit</button>
          </div>
        </form>
      </div>

      <div className="results">
          {this.loader(loading)}
        <Movies movie = {this.state.Result} />
      </div>
    </div>
    )
  }
}

export default Search