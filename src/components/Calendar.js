import React, { useState } from 'react';
import moment from 'moment';
import Clock from './Clock';
import './Calendar.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(moment());

  const weekdaysShort = moment.weekdaysShort();

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'month'))}>Previous</button>
        <h2>{currentDate.format('MMMM YYYY')}</h2>
        <button onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}>Next</button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    return weekdaysShort.map(day => (
      <div className="calendar-day-of-week" key={day}>
        {day}
      </div>
    ));
  };

  const renderCells = () => {
    const monthStart = currentDate.clone().startOf('month');
    const monthEnd = currentDate.clone().endOf('month');
    const startDate = monthStart.clone().startOf('week');
    const endDate = monthEnd.clone().endOf('week');

    const day = startDate.clone().subtract(1, 'day');
    const cells = [];

    while (day.isBefore(endDate, 'day')) {
      cells.push(
        <div
          className={`calendar-cell ${!day.isSame(currentDate, 'month') ? 'disabled' : ''}`}
          key={day}
          onClick={() => handleDateClick(day.clone())}
        >
          <span className="calendar-date">{day.add(1, 'day').date()}</span>
        </div>
      );
    }

    return cells;
  };

  const handleDateClick = (date) => {
    console.log('Clicked date:', date.format('YYYY-MM-DD'));
  };

  return (
    <div className="calendar">
      <Clock />
      {renderHeader()}
      <div className="calendar-body">
        <div className="calendar-grid">
          {renderDaysOfWeek()}
          {renderCells()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
