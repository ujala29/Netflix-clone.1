// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.mongo_altas, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('✅ Connected to MongoDB Atlas');
	} catch (err) {
		console.error('❌ MongoDB connection error:', err.message);
		process.exit(1); // Exit process on failure
	}
};

export default connectDB;




// MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// })
//   .then(() => console.log('✅ Connected to MongoDB'))
//   .catch((err) => console.error('❌ Connection error:', err));