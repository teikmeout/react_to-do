const tasks = require('express').Router();

const showMethod = (req, res) => res.json(`${req.method} tasks/${req.params.taskID}`);

// in order of specificity so it catches it first if it has an ID
tasks.route('/:taskId')
  .get(showMethod)
  .put(showMethod)
  .delete(showMethod);

tasks.route('/')
  .get(showMethod)
  .post(showMethod)

// router.get('/tasks', (req, res) => {
//   res.json('inside tasks GET');
// });

// router.post('/tasks', (req, res) => {
//   res.json('inside tasks POST');
// });

module.exports = tasks;
