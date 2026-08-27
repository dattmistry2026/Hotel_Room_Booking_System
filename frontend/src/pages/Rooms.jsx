import { useState, useEffect } from 'react';
import axiosInstance from '../axiosConfig';
import RoomForm from '../components/RoomForm';
import RoomList from '../components/RoomList';
import { useAuth } from '../context/AuthContext';

const Rooms = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axiosInstance.get('/api/rooms', {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRooms(response.data);
      } catch (error) {
        alert('Failed to fetch rooms.');
      }
    };
    fetchRooms();
  }, [user]);

  return (
    <div className="container mx-auto p-6">
      <RoomForm
        rooms={rooms}
        setRooms={setRooms}
        editingRoom={editingRoom}
        setEditingRoom={setEditingRoom}
      />
      <RoomList rooms={rooms} setRooms={setRooms} setEditingRoom={setEditingRoom} />
    </div>
  );
};

export default Rooms;