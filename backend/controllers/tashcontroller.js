const Room = require('../models/Room');

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addRoom = async (req, res) => {
    const { roomNumber, type, pricePerNight, isAvailable } = req.body;
    try {
        const room = await Room.create({ roomNumber, type, pricePerNight, isAvailable });
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRoom = async (req, res) => {
    const { roomNumber, type, pricePerNight, isAvailable } = req.body;
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        room.roomNumber = roomNumber || room.roomNumber;
        room.type = type || room.type;
        room.pricePerNight = pricePerNight || room.pricePerNight;
        room.isAvailable = isAvailable ?? room.isAvailable;
        const updatedRoom = await room.save();
        res.json(updatedRoom);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRoom = async (req, res) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) return res.status(404).json({ message: 'Room not found' });
        await room.deleteOne();
        res.json({ message: 'Room deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getRooms, addRoom, updateRoom, deleteRoom };