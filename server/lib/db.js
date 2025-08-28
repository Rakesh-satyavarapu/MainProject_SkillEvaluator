let mongoose = require('mongoose');

exports.connectDB = async()=>
    {
        try{
            await mongoose.connect(process.env.MONGODB_URI)
            console.log('Database connected successfully');
            }
        catch(err)
        {
            console.log("Error in database Connection",err)
        }
    }