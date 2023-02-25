const { json } = require("express");
const express = require ("express");
const app = express();
app.use(express.json())

const courses = [
    {id:1, name: "course1"},
    {id:2, name: "course2"},
    {id:3, name: "course3"}
]

app.get("/", (req,res) =>{
    res.send("Hello world")
})

app.get("/api/courses",(req,res)=>{
    res.send([1,2,3]);
})


app.get("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given ID was not found.")
    res.send(course);
})


app.post("/api/courses/",(req,res) =>{
    // const course = courses.find(c => c.id === parseInt(req.params.id))
    // if (!course) res.status(404).semd("This course with given ID cannot be found")
    const course = {
        id: courses.lenght +1,
        name: req.body.name
    }

})
app.listen(3000,() => console.log(`Listening on port 3000...`))
// const k  = process.env.PORT || 3000;


