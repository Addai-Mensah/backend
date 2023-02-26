const Joi = require ("joi")
const { json } = require("express");
const express = require ("express");
const app = express();
app.use(express.json())

const courses = [
    {id:1, name: "course1"},
    {id:2, name: "course2"},
    {id:3, name: "course3"},
    {id:4, name: "course4"},

]

app.get("/", (req,res) =>{
    res.send("Hello world")
})

app.get("/api/courses",(req,res)=>{
    res.send(courses)
})


app.get("/api/courses/:id", (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given ID was not found.")
    res.send(course);
}) 


app.post("/api/courses/",(req,res) =>{

    const  {error}  = validateCourse(req.body)
    if (error ){ res.status(400).send(error.details[0].message)
    return;
    }


    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)

})

app.put("/api/courses/:id", (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
     if(!course) return
     res.status(404).send("The course with the given ID was not found.")
    

    const  {error}  = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message);
    course.name = req.body.name
    res.send(course)

})

app.delete("/api/courses/:id", (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) res.status(404).send("The course with the given ID was not found.")
    res.send(course);

    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})




app.listen(3000,() => console.log(`Listening on port 3000...`))
// const k  = process.env.PORT || 3000;


 let validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course.body,schema);
 }

















// g
//  https:github.com/Addai-Mensah/backend.git