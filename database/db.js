const mongoose=require('mongoose');
// require('dotenv').config;
// dotenv.config({path: './db.js'})
// let url=process.env.DB || "mongodb://localhost:27017/5d_solution";
let DB=process.env.DB || "mongodb://13.127.232.191:21819/ticket_system";


mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
}).then(()=>{
    console.log("db connected successfully!")
}).catch((err)=>{
    console.log("errro while connected db,........")
    console.log(err.message)
})


module.exports=mongoose;