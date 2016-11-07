const router = require('express').Router();

router.get('/tasks', (req, res) => {
  res.json('inside tasks GET');
});

router.post('/tasks', (req, res) => {
  res.json('inside tasks POST');
});

module.exports = router;
