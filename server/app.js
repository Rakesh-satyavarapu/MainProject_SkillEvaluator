let {connectDB} =  require('./lib/db.js')

let authRoutes = require('./routes/auth.route.js')
let userRoutes = require('./routes/user.route.js')
let skillRoutes = require('./routes/skill.route.js')
let {protectedRoute} = require('./middlewares/auth.middleware.js')
const cookieParser = require('cookie-parser');

let express = require('express');
let app = express();

let dotenv = require('dotenv')
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/auth',authRoutes)
app.use('/user',protectedRoute,userRoutes)
app.use('/skill',skillRoutes)


let PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listening on http://localhost:${PORT}`)
})