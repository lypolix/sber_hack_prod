import React from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Calendar({ selectedDate, onSelectDate }) {
  return (
    <div style={{ margin: 'auto', width: 350 }}>
      <ReactCalendar
        onChange={onSelectDate}
        value={selectedDate}
        minDate={new Date()}
      />
    </div>
  );
}
