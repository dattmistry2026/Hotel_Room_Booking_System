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
    <div>
      <section className="bg-navy-900 px-6 py-14 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="eyebrow text-gold-400">Stay somewhere unforgettable</p>
          <h1 className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-tight sm:text-5xl">
            Manage the rooms guests fall in love with.
          </h1>
          <p className="mt-3 max-w-xl text-white/70">
            Add, edit, and track every room in your property — pricing and
            availability, all in one place.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <RoomForm
          rooms={rooms}
          setRooms={setRooms}
          editingRoom={editingRoom}
          setEditingRoom={setEditingRoom}
        />

        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="font-display text-2xl font-semibold text-navy-800">
            Your rooms
          </h2>
          <span className="text-sm text-ink/50">
            {rooms.length} {rooms.length === 1 ? 'room' : 'rooms'}
          </span>
        </div>

        <RoomList rooms={rooms} setRooms={setRooms} setEditingRoom={setEditingRoom} />
      </div>
    </div>
  );
};

export default Rooms;