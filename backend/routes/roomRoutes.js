const express = require('express');
const { getRooms, addRoom, updateRoom, deleteRoom } = require('../controllers/tashcontroller');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getRooms).post(protect, addRoom);
router.route('/:id').put(protect, updateRoom).delete(protect, deleteRoom);

module.exports = router;