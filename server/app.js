let {connectDB} =  require('./lib/db.js')

let authRoutes = require('./routes/auth.route.js')
let adminRoutes = require('./routes/admin.route.js')
let userRoutes = require('./routes/user.route.js')
let skillRoutes = require('./routes/skill.route.js')
let testRoutes = require('./routes/test.route.js')
let forgotPassRoutes = require('./routes/forgotPass.router.js')

const {protectedRoute,adminOnly} = require('./middlewares/auth.middleware.js')
const cookieParser = require('cookie-parser');

let express = require('express');
let app = express();
let cors = require('cors')

let dotenv = require('dotenv')
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use('/auth',authRoutes)
app.use('/user',protectedRoute,userRoutes)
app.use('/admin',protectedRoute,adminOnly,adminRoutes)
app.use('/skill',skillRoutes)
app.use('/test',testRoutes)
app.use('/api',forgotPassRoutes)

let PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listening on http://localhost:${PORT}`)
})

// const axios = require('axios');

// filepath: d:\rakesh\MainProject\server\controllers\test.controller.js

// async function listGeminiModels() {
//   try {
//     const apiKey = process.env.GEMINI_API_KEY;
//     const response = await axios.get(
//       'https://generativelanguage.googleapis.com/v1beta/models',
//       { params: { key: apiKey } }
//     );
//     // Returns array of model objects
//     return response.data.models;
//   } catch (err) {
//     console.error("ListModels error:", err.message);
//     return null;
//   }
// }

// // Example usage:
// listGeminiModels().then(models => {
//   if (models) {
//     console.log("Available Gemini models:", models);
//   } else {
//     console.log("Failed to list models.");
//   }
// });