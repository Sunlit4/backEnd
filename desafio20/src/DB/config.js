import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connectDB = async() =>{
    try{
        const url = process.env.MONGO_URL
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

    } catch(error){
        console.error(error)
    }
}

export default connectDB