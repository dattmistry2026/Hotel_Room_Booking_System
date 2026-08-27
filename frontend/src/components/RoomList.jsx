import { useAuth } from '../context/AuthContext';
import axiosInstance from '../axiosConfig';

const RoomList = ({ rooms, setRooms, setEditingRoom }) => {
  const { user } = useAuth();

  const handleDelete = async (roomId) => {
    try {
      await axiosInstance.delete(`/api/rooms/${roomId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setRooms(rooms.filter((room) => room._id !== roomId));
    } catch (error) {
      alert('Failed to delete room.');
    }
  };

  return (
    <div>
      {rooms.map((room) => (
        <div key={room._id} className="bg-gray-100 p-4 mb-4 rounded shadow">
          <h2 className="font-bold">Room {room.roomNumber} ({room.type})</h2>
          <p>${room.pricePerNight} / night</p>
          <p className="text-sm text-gray-500">
            {room.isAvailable ? 'Available' : 'Not available'}
          </p>
          <div className="mt-2">
            <button
              onClick={() => setEditingRoom(room)}
              className="mr-2 bg-yellow-500 text-white px-4 py-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(room._id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;