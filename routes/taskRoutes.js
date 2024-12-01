const express = require('express');
const {
    addTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/TaskController');
const router = express.Router();

router.post('/', addTask);
router.get('/', getTasks);
router.get('/:taskId', getTaskById);
router.put('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);

module.exports = router;
