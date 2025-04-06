import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes importing
import { basicRouter } from '../routes/basic.routes.js';
import { authRouter } from '../routes/auth.routes.js';
import { profileRouter } from '../routes/profile.routes.js';
import { subRouter } from '../routes/sub.routes.js';
import { adminRouter } from '../routes/admin.routes.js';

// Routes
app.use('/api', basicRouter)
app.use("/api/auth", authRouter)
app.use("/api/profile", profileRouter)
app.use("/api/newsletter", subRouter);
app.use("/api/admin", adminRouter)

export { app };
