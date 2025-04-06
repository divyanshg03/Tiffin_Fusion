import { Router } from 'express'

const basicRouter = Router()

basicRouter.get('/', (req, res) => {
  res.send('<h1>API is working</h1>')
});

export { basicRouter }