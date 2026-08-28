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
    <form
      onSubmit={handleSubmit}
      className="rounded-xl2 border border-navy-800/8 bg-white p-6 shadow-card mb-10"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="eyebrow">{editingRoom ? 'Editing' : 'New listing'}</p>
          <h2 className="font-display text-xl font-semibold text-navy-800">
            {editingRoom ? 'Edit room' : 'Add a room'}
          </h2>
        </div>
        {editingRoom && (
          <button
            type="button"
            onClick={() => setEditingRoom(null)}
            className="text-sm font-medium text-ink/50 hover:text-navy-800"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="field-label">Room number</label>
          <input
            type="text"
            placeholder="e.g. 214"
            value={formData.roomNumber}
            onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Room type</label>
          <input
            type="text"
            placeholder="Single, Double, Suite"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="field-input"
          />
        </div>
        <div>
          <label className="field-label">Price per night</label>
          <input
            type="number"
            placeholder="180"
            value={formData.pricePerNight}
            onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
            className="field-input"
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-5">
        {editingRoom ? 'Update room' : 'Add room'}
      </button>
    </form>
  );
};

export default RoomForm;