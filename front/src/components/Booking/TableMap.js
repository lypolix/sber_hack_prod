import React from 'react';

// 6 мест в каждом столе, 3 обычных стола (верх), 3 обычных стола (низ)
const tables = [
  { label: 'стол 1', seats: 6 },
  { label: 'стол 2', seats: 6 },
  { label: 'стол 3', seats: 6 },
  { label: 'стол 4', seats: 6 },
  { label: 'стол 5', seats: 6 },
  // Нестандартный стол с печеньками
  { label: 'печенье и чай', seats: 0, special: true },
];

const seatsPerRow = 3;

export default function TableMap({ selectedSeat, onSelectSeat }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
      {/* Верхний ряд столов */}
      <div style={{ display: 'flex', gap: '48px', marginBottom: 40 }}>
        {tables.slice(0, seatsPerRow).map((table, tableIdx) => (
          <TableBlock
            key={tableIdx}
            tableIdx={tableIdx}
            seats={table.seats}
            label={table.label}
            special={table.special}
            selectedSeat={selectedSeat}
            onSelectSeat={onSelectSeat}
          />
        ))}
      </div>
      {/* Нижний ряд столов */}
      <div style={{ display: 'flex', gap: '48px' }}>
        {tables.slice(seatsPerRow, seatsPerRow * 2).map((table, tableIdx) => (
          <TableBlock
            key={tableIdx + seatsPerRow}
            tableIdx={tableIdx + seatsPerRow}
            seats={table.seats}
            label={table.label}
            special={table.special}
            selectedSeat={selectedSeat}
            onSelectSeat={onSelectSeat}
          />
        ))}
      </div>
    </div>
  );
}

function TableBlock({ tableIdx, seats, label, special, selectedSeat, onSelectSeat }) {
  return (
    <div
      style={{
        border: '2px solid #27213b',
        borderRadius: 16,
        width: 180,
        minHeight: 90,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        background: special ? '#eee' : '#f6faff',
        boxShadow: special ? '0 0 0 2px #ffbf73' : '0 4px 16px #2222',
        opacity: special ? 0.8 : 1,
      }}
    >
      {special ? (
        <div style={{ fontSize: 16, color: '#FF9800', fontWeight: 700, padding: 12 }}>
          🍪 {label}
        </div>
      ) : (
        <>
          <div style={{ fontSize: 15, color: '#347cff', marginBottom: 12 }}>
            {label} ({seats} мест)
          </div>
          <div style={{ display: 'flex', gap: '9px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[...Array(seats)].map((_, seatIdx) => (
              <button
                key={seatIdx}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 6,
                  background: selectedSeat && selectedSeat.table === tableIdx && selectedSeat.seat === seatIdx
                    ? '#347cff'
                    : '#32e3af',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 1px 5px #3333',
                }}
                onClick={() => onSelectSeat(tableIdx, seatIdx)}
              >
                {seatIdx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
