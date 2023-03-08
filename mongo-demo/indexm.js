const mongoose = require ("mongoose")
mongoose.connect('mongodb://127.0.0.1:27017/?directConnection=true')

.then (() =>console.log('connected to MongoDB...'))
.catch (() => console.error('could not connect to Mongodb'))

const courseSchema = new mongoose.Schema({
    name: {
        type: String, 
        Required: true,
        minlength:5,
        maxlength: 255,
    },
    author: String,
    tags:{
        type:Array,
        validate: {
            isAsync: true,
            validator: function (v,callback){
                setTimeout(() =>{
                    const result = v && v.length > 0;
                    callback(result)
                }, 3000)
            },
            message: "A course should have atleast one tag"
        }
    },
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price:{
        type:number,
        required: function () {return this.isPublished}
    },

    category:{ 
       type:String, 
       required:true,
       enum:["web","mobile","network"]
    }
 })  
 
 //  models are used to compile schema
 const Course = mongoose.model('Course',courseSchema);

// schema defines the shape of document in a database
async function createCourse(){

    const course = new Course({
        name:"Angular Course",
        author: "Kojo",
        tags: ["angular", "frontend"],
        isPublished: true,
        price: 15,
        category:"web"
    });



    try{
        const result = await course.sa ve();
        console.log(result)
    }

    

    catch(ex){ 
       for(field in ex.errors)
       console.log(ex.errors[field].message)
    }  
}
// createCourse();
 
async function getCourses(){
    const courses = await Course
    .find({author:"Mosh", isPublished: true})   
    .limit(10)
    .sort({name:1})
    .select({name:1, tags:1});
    console.log(courses)
}
  
async function updateCourse(id){
    const result = await Course.findByIdAndUpdate(id,{
        $set:{
            author:"Mensah",
            isPublished: false
        }
    },{New: true})
}

const courseScheme = new mongoose.Schema({
    name:{
        type: String,
        minlength:5,
        maxlength:18,
        required:true,
    },
    author:{
        type: String,
        minlength:6,
        required:true,

    },

    tags:{
        type: Array,
        enum:"frontend",
        requred:true,
    }
})

const Courses = mongoose.model("Course",courseScheme);

async function createCourse() {
    const course = await new Course({
        name:"Mathematics",
        author: "Kojo",
        tags:["frontend","react","javascript"]
    })
   try{
    const result = await course.save()
   }

   catch(ex){
    for (field in ex.errors)
    console.log(ex.errors.field[0].message)
   }
}
