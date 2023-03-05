const Joi = require ("joi")
const { json } = require("express");
const express = require ("express");
const app = express();
app.use(express.json())


const mongoose = require ("mongoose")
mongoose.connect("mongodb://localhost/vidly")
.then(() => console.log("connected to mongo db"))
.catch (err => console.log("could not connect to mongodb"))
const vidly=[
    {id:1, genres:"action"},
    {id:2, genres:"comedy"},
    {id:3, genres:"romance"},
    {id:4, genres:"documentary"},
    {id:5, genres:"crime"},
]

app.get("/api/vidly",(req,res) =>{
    res.send(vidly)
})



app.get("/api/vidly/:genres",(req,res) =>{
    const movie = vidly.find( m => m.genres === req.params.genres)
   if(!movie) return res.status(404).send("movie with this genres cant be found");
   res.send(movie)


})


app.post("/api/vidly/", (req,res) =>{

 const {error} = validateMovie(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const movie = {
    id: vidly.length +1,
    genres:req.body.genres
  }
  
  vidly.push(movie)
  res.send(movie)

})  


app.put("/api/vidly/:genres",(req,res) =>{
    const movie = vidly.find( m => m.genres === req.params.genres)
   if(!movie) return res.status(404).send("movie with this genres cannot be found");
  

    const {error} = validateMovie(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  movie.genres = req.body.genres
  res.send(movie)

})

app.delete("/api/vidly/:genres",(req,res) =>{
    const movie = vidly.find( m => m.genres === req.params.genres)
   if(!movie) return res.status(404).send("movie with this genres cannot be found");

   const index = vidly.indexOf(movie)
   vidly.splice(index,1)
   res.send(movie)
})

app.listen(3000,() => console.log("listening to port 3000..."));

 let validateMovie = (movie) =>{
  const  schema = {
        genres: Joi.string().min(4).required()
    }

 return Joi.validate(movie,schema);
 }


