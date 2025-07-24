// const mongoose = require("mongoose")

// const connectDB =async () =>{
//     try{
//     await mongoose.connect("mongodb://localhost:27017/pawsewa_db")
//     console.log("Database connection Successful")
// }catch(e){
//     console.log(e)
//     }
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
  }
};

module.exports = connectDB;
