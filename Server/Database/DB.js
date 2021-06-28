const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("MongoDB Connected")
    } catch(err) {
        console.log("🚀 ~ file: DB.js ~ line 13 ~ connectDB ~ err", err)
        process.exit(1);
    }
};

connectDB();
module.exports = mongoose;