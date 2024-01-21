const express = require('express')
const app = express()
const cors= require('cors')
const cookieParser= require('cookie-parser')
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname)); 
app.use(cookieParser());

app.use(cors({
    origin: "*",
    methods: ["Get", "Patch", "Post", "Put", "Delete"],
    credentials: true,
    allowedHeaders: ["Content-Type"],

}));


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
})


app.get("/", (req, res)=>{
    console.log("api is calling")
    return res.send({message: "api is calling for testing..", data: []})
})

let routes=require('./route/index')
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});
