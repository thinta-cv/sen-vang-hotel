const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000/api';

export const fetchRooms = async () => {
  const response = await fetch(`${API_URL}/rooms`);
  if (!response.ok) throw new Error('Failed to fetch rooms');
  return response.json();
};

export const fetchRoomById = async (id: string) => {
  const response = await fetch(`${API_URL}/rooms/${id}`);
  if (!response.ok) throw new Error('Failed to fetch room');
  return response.json();
};

export const createBooking = async (bookingData: any) => {
  const response = await fetch(`${API_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bookingData),
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
};

export const fetchAdminBookings = async () => {
  const response = await fetch(`${API_URL}/admin/bookings`);
  if (!response.ok) throw new Error('Failed to fetch admin bookings');
  return response.json();
};

export const updateBookingStatus = async (id: string, status: string) => {
  const response = await fetch(`${API_URL}/bookings/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  });
  if (!response.ok) throw new Error('Failed to update booking status');
  return response.json();
};

export const fetchAdminGuests = async () => {
  const response = await fetch(`${API_URL}/admin/guests`);
  if (!response.ok) throw new Error('Failed to fetch admin guests');
  return response.json();
};

export const createRoom = async (roomData: any) => {
  const response = await fetch(`${API_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData)
  });
  if (!response.ok) throw new Error('Failed to create room');
  return response.json();
};

export const updateRoom = async (id: string, roomData: any) => {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(roomData)
  });
  if (!response.ok) throw new Error('Failed to update room');
  return response.json();
};

export const deleteRoom = async (id: string) => {
  const response = await fetch(`${API_URL}/rooms/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete room');
  return response.json();
};
