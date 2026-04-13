import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import 'dotenv/config';
import contactRouter from './routes/contact.js';
import githubRouter from './routes/github.js';
import projectsRouter from './routes/projects.js';

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

app.use(helmet());
app.use(cors({
  origin: [CLIENT_URL, 'http://localhost:5173', 'http://localhost:4173'],
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/github', githubRouter);
app.use('/api/projects', projectsRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`\n  Server running on http://localhost:${PORT}`);
  console.log(`  Client origin:   ${CLIENT_URL}\n`);
});
