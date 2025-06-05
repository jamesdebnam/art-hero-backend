import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dbOperations from './database';

// Initialize Express app
const app: express.Application = express();
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());

// Routes
// POST /masterpiece - Create a new masterpiece
app.post('/masterpiece', async (req: Request, res: Response) => {
  try {
    // The request body is expected to be a JSON object
    const data: any = req.body;

    // Create the masterpiece in the database
    const result = await dbOperations.createMasterpiece(data);

    // Return the created masterpiece with status 201 (Created)
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating masterpiece:', error);
    res.status(500).json({ error: 'Failed to create masterpiece' });
  }
});

// GET /masterpiece - Get all masterpieces
app.get('/masterpiece', async (_req: Request, res: Response) => {
  try {
    const masterpieces = await dbOperations.getAllMasterpieces();

    res.json(masterpieces);
  } catch (error) {
    console.error('Error retrieving masterpieces:', error);
    res.status(500).json({ error: 'Failed to retrieve masterpieces' });
  }
});

// GET /masterpiece/:id - Get a specific masterpiece by ID
app.get('/masterpiece/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;

    const masterpiece = await dbOperations.getMasterpieceById(id);

    res.json(masterpiece);
  } catch (error: any) {
    console.error('Error retrieving masterpiece:', error);

    if (error.message === 'Masterpiece not found') {
      res.status(404).json({ error: 'Masterpiece not found' });
    } else {
      res.status(500).json({ error: 'Failed to retrieve masterpiece' });
    }
  }
});

// PATCH /masterpiece/:id - Update a specific masterpiece by ID
app.patch('/masterpiece/:id', async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id;
    const data: any = req.body;

    const updatedMasterpiece = await dbOperations.updateMasterpiece(id, data);

    res.json(updatedMasterpiece);
  } catch (error: any) {
    console.error('Error updating masterpiece:', error);

    if (error.message === 'Masterpiece not found') {
      res.status(404).json({ error: 'Masterpiece not found' });
    } else {
      res.status(500).json({ error: 'Failed to update masterpiece' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
