let {connectDB} =  require('./lib/db.js')
let authRoutes = require('./routes/auth.route.js')
let express = require('express');

let app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use('/auth',authRoutes)

app.get('/',(req,res)=>{
    res.json({msg:'From Server'});
})

app.listen((5000),()=>{
    connectDB();
    console.log('Server listening on http://localhost:5000')
})