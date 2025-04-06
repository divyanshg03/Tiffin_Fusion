import dotenv from 'dotenv';
import { dbConnect } from './api/dbconnect.js';
import { app } from './api/app.js';

// Load environment variables
dotenv.config();

await dbConnect();
console.log('Database connected: ', process.env.MONGO_URI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}, press Ctrl+C to stop`);
});
