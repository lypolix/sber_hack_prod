import React from 'react';

const totalSeats = 25;

export default function SeatMap({ bookedSeats }) {
  const isBooked = (seatId) => bookedSeats.includes(seatId);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px', marginTop: '20px' }}>
      {[...Array(totalSeats).keys()].map((i) => {
        const seatId = i + 1;
        const booked = isBooked(seatId);
        return (
          <button
            key={seatId}
            disabled={booked}
            style={{
              width: 50,
              height: 50,
              backgroundColor: booked ? '#d9534f' : '#5cb85c',
              color: 'white',
              borderRadius: 6,
              cursor: booked ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
            }}
            title={booked ? 'Забронировано' : 'Свободно'}
          >
            {seatId}
          </button>
        );
      })}
    </div>
  );
}
