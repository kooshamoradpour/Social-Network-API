import express, { json } from 'express';
import { once } from './config/connection.js';
import userRoutes from './routes/userRoutes.js';
import thoughtRoutes from './routes/thoughtRoutes.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(json());
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

once('open', () => {
  app.listen(PORT, () => console.log(` Server running on http://localhost:${PORT}`));
});
