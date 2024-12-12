const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    // toggleUserStatus,
    verifyToken,
    deleteUserById,
    logoutUser,
    createUser,
} = require('../controllers/userController');
const tokenMiddleware = require('../middleware/token.middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify', verifyToken);
router.post('/logout', tokenMiddleware, logoutUser);

router.get('/', tokenMiddleware, getAllUsers);
router.get('/:id', tokenMiddleware, getUserById);
router.post('/', tokenMiddleware, createUser);
router.put('/:id', tokenMiddleware, updateUserById);
router.delete('/:id', deleteUserById);
// router.patch('/:id/toggle-status', tokenMiddleware, toggleUserStatus);


module.exports = router;
