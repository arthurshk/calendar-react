import React, {useState} from 'react';
import moment from 'moment';
import './Calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [events, setEvents] = useState([]);
  
    const addEvent = (date, event) => {
      setEvents([...events, { date, event }]);
    };
  
    const renderDays = () => {
      const startOfMonth = currentDate.clone().startOf('month');
      const endOfMonth = currentDate.clone().endOf('month');
      const startDate = startOfMonth.clone().startOf('week');
      const endDate = endOfMonth.clone().endOf('week');
  
      const day = startDate.clone().subtract(1, 'day');
      const days = [];
  
      while (day.isBefore(endDate, 'day')) {
        const currentDay = day.add(1, 'day').clone();
        const dayEvents = events.filter(event => moment(event.date).isSame(currentDay, 'day'));
  
        days.push(
          <div className="calendar-day" key={currentDay}>
            {currentDay.date()}
            {dayEvents.map((event, index) => (
              <div key={index} className="calendar-event">
                {event.event}
              </div>
            ))}
          </div>
        );
      }
  
      return days;
    };
  
    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setCurrentDate(currentDate.clone().subtract(1, 'month'))}>Previous</button>
          <h2>{currentDate.format('MMMM YYYY')}</h2>
          <button onClick={() => setCurrentDate(currentDate.clone().add(1, 'month'))}>Next</button>
        </div>
        <div className="calendar-body">
          <div className="calendar-grid">
            {renderDays()}
          </div>
        </div>
        <div className="add-event">
          <input type="text" placeholder="Event" />
          <button onClick={() => addEvent(currentDate, 'Sample Event')}>Add Event</button>
        </div>
      </div>
    );
  };