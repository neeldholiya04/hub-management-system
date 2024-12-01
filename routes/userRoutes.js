const express = require('express');
const {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require('../controllers/UserController');
const router = express.Router();

router.post('/', addUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

module.exports = router;
