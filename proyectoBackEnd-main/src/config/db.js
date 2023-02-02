import dotenv from "dotenv"
import mongoose from "mongoose";
import { logger } from "../utils/index.js";

dotenv.config(); 

const connectMongo = async () => {
	try {
		const url = process.env.MONGODB_URI;
        mongoose.set('strictQuery', false)
		mongoose.connect(url,{
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		logger.info("MongoDb conectado");
	} catch (error) {
		logger.error(`Error de conexion: ${error}`);
	}
};


export default connectMongo; 

