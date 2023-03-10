const Joi = require ("joi")
const { json } = require("express");
const express = require ("express");
const config = require("config");
const app = express();
const morgan = require ("morgan")
app.use(express.json())


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
// console.log(`app: ${app.get("env")}`)

if (app.get("env") === "development"){
    app.use(morgan("tiny"));
    console.log("Morgan enabled...")
}



console.log("Application Name:" + config.get("name"));
console.log("Mail Server:" + config.get("mail.host"))

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
    if(!course) return res.status(404).send("The course with the given ID was not found.")
    
    res.send(course)
}) 


app.post("/api/courses/",(req,res) =>{

    const  {error}  = validateCourse(req.body)
    if (error ) {
   res.status(400).send(error.details[0].message)
   return;}
    

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }
    courses.push(course)
    res.send(course)
})

app.put("/api/courses/:id", (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
     if(!course) return res.status(404).send("The course with the given ID was not found.")
    

    const  {error}  = validateCourse(req.body)
    if (error)  res.status(400).send(error.details[0].message);
    course.name = req.body.name
    res.send(course)

})

app.delete("/api/courses/:id", (req,res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if(!course) return
    res.status(404).send("The course with the given ID was not found.")
   

    const index = courses.indexOf(course)
    courses.splice(index,1)
    res.send(course)
})

function validateCourse (course) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);
 }



const port = process.env.PORT||3000;
app.listen(port,()=> console.log(`Listening on port ${port}....`))



  
















// g
//  https:github.com/Addai-Mensah/backend.git