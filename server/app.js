let express = require('express');
let mongoose = require('mongoose');
let app = express();

app.get('/',(req,res)=>{
    res.json({msg:'From Server'});
})



mongoose.connect(`mongodb://localhost:27017/MainProjectDB`)
.then(()=>{
    console.log('Database connected successfully');
    app.listen((5000),()=>{
    console.log('Server listening on http://localhost:5000')
})        
})
.catch((err)=>
{
    console.log("Error in database COnnection",err)
})