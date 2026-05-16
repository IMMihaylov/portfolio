import express from 'express';

const router = express.Router({mergeParams: true});

router.get('/', (req, res) => {
  res.status(200);
  res.json({ message: 'Hello from the API!' });
});

router.get('/contact', (req, res) => {
  res.status(200);
  res.json({ message: 'Contact endpoint is working!' });
});



export default router;