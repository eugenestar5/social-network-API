const router = require('express').Router();

const {
    getUsers, 
    userById, 
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');

// http://localhost:3001/api/users
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// http://localhost:3001/api/users/:id
router
    .route('/:id')
    .get(userById)
    .delete(deleteUser)
    .put(updateUser);

// http://localhost:3001/api/users/:id/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router; 