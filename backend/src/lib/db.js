import mongoose from "mongoose";
export const connectDB=async()=>{
    try {
    const conn=    await mongoose.connect(process.env.MONGODB_URI);
    console.group("DB Connected")

    } catch (error) {
        console.log(error)
        
    }
}
export default connectDB