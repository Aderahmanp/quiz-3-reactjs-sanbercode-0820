import React, { Component } from 'react';
import axios from "axios"

class Home extends Component {
    state = {
        movies: []
    }

    componentDidMount() {
        axios.get(`http://backendexample.sanbercloud.com/api/movies`)
        .then(res => {
            const movies = res.data
            this.setState({movies})
            console.log(movies)
        })
    }
    render() {
        return (
            <>
            <div className="homeContainer">
            <h1 >Daftar Firm Film Terbaik</h1>
                {
                    this.state.movies.map((movie, index) => {
                        return (
                        <div className="card" key={movie.id}>
                            <div className="cardTitle">{movie.title}</div>
                            <div className="flexBodyCard">
                                <img className="cardImg" src={movie.image_url}/>
                                <div className="ratingCard">
                                    <strong>
                                    <div>Rating: {movie.rating}</div>
                                    <div>Durasi: {movie.duration} Jam</div>
                                    <div>Genre: {movie.genre}</div>
                                    </strong>
                                </div>

                            </div>
                            <div> <strong>Deskripsi :</strong> {movie.description}</div>
                            <hr></hr>
                        </div>
                        
                        
                        )
                    })
                }
            </div>  
            </>

        )
    }
}


export default Home
