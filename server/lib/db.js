let mongoose = require('mongoose');

exports.connectDB = async()=>
    {
        try{
            await mongoose.connect(`mongodb://localhost:27017/MainProjectDB`)
            console.log('Database connected successfully');
            }
        catch(err)
        {
            console.log("Error in database Connection",err)
        }
    }