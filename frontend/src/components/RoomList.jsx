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

  if (rooms.length === 0) {
    return (
      <div className="rounded-xl2 border border-dashed border-navy-800/20 bg-white/60 p-10 text-center">
        <p className="font-display text-lg text-navy-800">No rooms yet</p>
        <p className="mt-1 text-sm text-ink/60">
          Add your first room above to see it listed here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <div
          key={room._id}
          className="overflow-hidden rounded-xl2 border border-navy-800/8 bg-white shadow-card transition-transform hover:-translate-y-0.5"
        >
          <div className="flex h-32 items-center justify-center bg-gradient-to-br from-navy-700 to-navy-900">
            <span className="font-display text-3xl font-semibold text-white/90">
              {room.roomNumber}
            </span>
          </div>

          <div className="p-5">
            <p className="eyebrow">Room {room.roomNumber}</p>
            <h3 className="mt-1 font-display text-lg font-semibold text-navy-800">
              {room.type}
            </h3>

            <p
              className={`mt-2 text-sm font-medium ${
                room.isAvailable ? 'text-emerald-700' : 'text-ink/40'
              }`}
            >
              {room.isAvailable ? 'Available now' : 'Currently booked'}
            </p>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-navy-800">
                <span className="font-display text-xl font-semibold">
                  ${room.pricePerNight}
                </span>
                <span className="text-sm text-ink/50"> / night</span>
              </p>
            </div>

            <div className="mt-4 flex gap-2 border-t border-navy-800/8 pt-4">
              <button
                onClick={() => setEditingRoom(room)}
                className="btn-secondary flex-1 !px-3 !py-2 text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room._id)}
                className="btn-danger flex-1 !px-3 !py-2 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomList;