const router = require('express').Router();

router.get('/', (req, res) => {
  res.json('HOME route made correctly');
});

module.exports = router;
