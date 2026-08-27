import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const RoomForm = ({ rooms, setRooms, editingRoom, setEditingRoom }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({ roomNumber: '', type: '', pricePerNight: '' });

  useEffect(() => {
    if (editingRoom) {
      setFormData({
        roomNumber: editingRoom.roomNumber,
        type: editingRoom.type,
        pricePerNight: editingRoom.pricePerNight,
      });
    } else {
      setFormData({ roomNumber: '', type: '', pricePerNight: '' });
    }
  }, [editingRoom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRoom) {
        const response = await axiosInstance.put(`/api/rooms/${editingRoom._id}`, formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRooms(rooms.map((r) => (r._id === response.data._id ? response.data : r)));
      } else {
        const response = await axiosInstance.post('/api/rooms', formData, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRooms([...rooms, response.data]);
      }
      setEditingRoom(null);
      setFormData({ roomNumber: '', type: '', pricePerNight: '' });
    } catch (error) {
      alert('Failed to save room.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded mb-6">
      <h1 className="text-2xl font-bold mb-4">{editingRoom ? 'Edit Room' : 'Add Room'}</h1>
      <input
        type="text"
        placeholder="Room Number"
        value={formData.roomNumber}
        onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Room Type (e.g. Single, Double, Suite)"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price per Night"
        value={formData.pricePerNight}
        onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        {editingRoom ? 'Update Room' : 'Add Room'}
      </button>
    </form>
  );
};

export default RoomForm;