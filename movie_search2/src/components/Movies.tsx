import React, { Component } from 'react';
import 'antd/dist/antd.css';
import {Pagination,Card} from 'antd';
const { Meta } = Card;

class Movies extends Component<any,any> {

    numEachPage:number = 4 
    constructor(props:any) {
        super(props);
        this.state = {
          minValue: 0,
          maxValue: 4
        };
      }

      handleChange = (value: number) => {
        this.setState({
          minValue: (value - 1) * this.numEachPage,
          maxValue: value * this.numEachPage
        });
      };
      
    render() {

    const {movie} = this.props;
    return (
    <div>
        {movie && movie.length > 0 &&
          movie.slice(this.state.minValue, 
              this.state.maxValue).map((item: { Title: string,Poster:string,Type:String,Year:String}) => (
            <div key={item.Poster+item.Title}>
              <Card cover={<img alt = "cover" src= {item.Poster} />}>
                <Meta title={item.Title} description= {<span>Year: {item.Year}   Type: {item.Type}</span>}/>
              </Card>
            </div>
          ))}
        <Pagination
          defaultCurrent={1}
          defaultPageSize={this.numEachPage}
          onChange={this.handleChange}
          total={40} 
        />
      </div>
    )}
}

export default Movies;