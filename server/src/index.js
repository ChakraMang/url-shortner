import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/routes.js'
const app = express();

const PORT = process.env.PORT || 5000;
dotenv.config();
// Connect to MongoDB (replace with your actual MongoDB connection string)
mongoose.connect(YOUR_MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


app.use(express.json());

app.use(cors());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})
