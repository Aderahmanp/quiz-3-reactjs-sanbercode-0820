import React, { useEffect, useState } from 'react';
import axios from 'axios'

const MovieListEditor = () => {
    const [movieList, setMovieList] = useState(null)
    const [input, SetInput] = useState({
        id:null,
        title: "",
        description: "",
        duration: 120,
        year: 2020,
        genre:"",
        rating:0,
        image_url: ""

    })

    useEffect(() => {
        if (movieList === null) {
            axios.get(`http://backendexample.sanbercloud.com/api/movies`)
            .then(res => {
                setMovieList(res.data.map(item => {
                    return item
                }))
            })
        }
    })

    const handleChange = (event) => {
        let typeOfInput = event.target.name

        switch (typeOfInput) {
            case "title" :
                {
                    SetInput({...input, title: event.target.value})
                    break
                }
            case "description":
                {
                    SetInput({...input, description: event.target.value})
                    break
                }
            case "year":
                {
                    SetInput({...input, year: event.target.value})
                    break
                }
            case "duration":
                {
                    SetInput({...input, duration:event.target.value})
                    break
                }
            case "genre":
                {
                    SetInput({...input, genre:event.target.value})
                    break
                }
            case "rating":
                {
                    SetInput({...input, rating: event.target.value})
                    break
                }
            case "image_url":
                {
                    SetInput({...input, image_url:event.target.value})
                }
            default:
                {break}
        }
    }

    const handleDelete = (event) => {
        let idMovie = parseInt(event.target.value)
        let newListMovie = movieList.filter(item => item.id !== idMovie)
        
        axios.delete(`http://backendexample.sanbercloud.com/api/movies/${idMovie}`)
        .then(res => {
            console.log(res)
        })
        setMovieList([...newListMovie])
    }

    const handleEdit = (event) => {
        let idMovie = parseInt(event.target.value)
        console.log(idMovie)
        let dataMovie = movieList.find(item => item.id == idMovie)
        SetInput({
            id: idMovie,
            title:dataMovie.title,
            description: dataMovie.description,
            year: dataMovie.year,
            duration:dataMovie.duration,
            genre:dataMovie.genre,
            rating:dataMovie.rating,
            image_url:dataMovie.image_url
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()

            let title = input.title
            let description = input.description
            let year = input.year
            let duration = input.duration
            let genre = input.genre
            let rating = input.rating
            let image_url = input.image_url

        if (input.id === null) {
            axios.post(`http://backendexample.sanbercloud.com/api/movies`, {
                title,
                description,
                year, 
                duration,
                rating,
                image_url
            })
            .then(res => {
                setMovieList([
                    ...movieList,
                    {
                        id : res.data.id,
                        title,
                        description,
                        year,
                        duration,
                        genre,
                        rating,
                        image_url
                    }
                ])
            })
        } else {
            axios.put(`http://backendexample.sanbercloud.com/api/movies/${input.id}`, {
                title,
                description,
                year, 
                duration,
                rating,
                image_url
            })
            .then(() => {
                let dataMovie = movieList.find(item => item.id === input.id)
                dataMovie.title = title
                dataMovie.description = description
                dataMovie.year = year
                dataMovie.duration = duration
                dataMovie.genre = genre
                dataMovie.rating = rating
                dataMovie.image_url = image_url
                setMovieList([...movieList])
            })
        }



        SetInput({
            id:null,
            title: "",
            description: "",
            duration: 120,
            year: 2020,
            genre:"",
            rating:0,
            image_url: ""
        })
    }



    return(
        <>
        <div className="containerTable">
             <form className="search">
                <input  type="text" placeholder="Search..." name="search"/>
                <button type="submit">Search</button>
            </form>
            <h1>Daftar Film</h1>
            <table >
            <thead>
            <tr>
                <th >No</th>
                <th >Title</th>
                <th >Description</th>
                <th > Year</th>
                <th >Duration</th>
                <th >Genre</th>
                <th >Rating</th>
                <th >Action</th>
            </tr>
            </thead>
            <tbody>

                {
                movieList !== null && movieList.map((item, index)=>{
                    return(                    
                        <tr key={index}>
                        <td >{index+1}</td>
                        <td className="titleTable" >{item.title}</td>
                        <td className="description" >{item.description.slice(0,17)}....</td>
                        <td >{item.year}</td>
                        <td >{item.duration}</td>
                        <td >{item.genre}</td>
                        <td >{item.rating}</td>
                        <td >
                        <button value={item.id} onClick={handleEdit} >Edit</button>
                        &nbsp;
                        <button  value={item.id} onClick={handleDelete}>Delete</button>
                        </td>
                    </tr>
                    )
                })
                }
            </tbody>
         </table>

         <h1>Movie Form</h1>
         <div className="formTable">
             <form onSubmit={handleSubmit} >
                 <label>Title:</label>
                 <input type="text" className="formInput" required name="title" value={input.title} onChange={handleChange} ></input>
                 <br/>
                 <label>Description:</label>
                 <textarea type="text" className="formInput" required name="description" value={input.description} onChange={handleChange}></textarea>
                 <br/>
                 <label>Year:</label>
                 <input type="text" className="formInput" required name="year" value={input.year} onChange={handleChange}></input>
                 <br/>
                 <label>Duration:</label>
                 <input type="number" className="formInput" required name="duration" value={input.duration} onChange={handleChange}></input>
                 <br/>
                 <label>Genre:</label>
                 <input type="text" className="formInput" required name="genre" value={input.genre} onChange={handleChange} ></input>
                 <br/>
                 <label>Rating:</label>
                 <input type="number" className="formInput" required name="rating" value={input.rating} onChange={handleChange}></input>
                 <br/>
                 <label>image url:</label>
                 <textarea type="text" className="formInput" required name="image_url" value={input.image_url} onChange={handleChange}></textarea>
                 <br/>
                 <br/>
                <div >
                <button >submit</button>
                </div>
             </form>
         </div>
        </div>
        </>
    )
}

export default MovieListEditor

// description(textarea)
// year(integer)- defaultnya 2020 dan minimal tahun 1980
// duration(integer) - dalam menit dan defaultnya 120
// genre(string)
// rating(integer) - minimal 0 - maksimal 10 defaultnya 0
// image_url(string

// GET http://backendexample.sanbercloud.com/api/movies

// POST http://backendexample.sanbercloud.com/api/movies

// PUT http://backendexample.sanbercloud.com/api/movies/{ID_MOVIES}

// DELETE http://backendexample.sanbercloud.com/api/movies/{ID_MOVIES}
