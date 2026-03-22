import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contact.js';
import chatRoutes    from './routes/chat.js';


dotenv.config();

const app  = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://portfolio-website-psi-amber-86.vercel.app"
];

app.use(cors({ origin: allowedOrigins, methods: ['GET','POST'], credentials: true }));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ status: 'ok', version: '3.0' }));
app.use('/api/contact', contactRoutes);
app.use('/api/chat',    chatRoutes);

app.use((_, res) => res.status(404).json({ error: 'Route not found' }));

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));
  })
  .catch((err) => { console.error('❌ MongoDB failed:', err.message); process.exit(1); });
