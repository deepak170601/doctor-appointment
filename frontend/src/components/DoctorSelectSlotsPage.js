import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DoctorSelectSlotsPage.css';

function DoctorSelectSlotsPage() {
  const [day, setDay] = useState('Monday');
  const [slots, setSlots] = useState({
    Monday: {},
    Tuesday: {},
    Wednesday: {},
    Thursday: {},
    Friday: {},
    Saturday: {}
  });

  useEffect(() => {
    const fetchSlots = async () => {
      const doctorUsername = localStorage.getItem('doctorUsername');
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${doctorUsername}/slots`);
        if (response.data.success) {
          setSlots(response.data.slots);
        }
      } catch (error) {
        console.error('Error fetching slots', error);
      }
    };
    fetchSlots();
  }, []);

  const handleSlotChange = (e) => {
    const { value, checked } = e.target;
    setSlots((prevSlots) => {
      const updatedSlots = { ...prevSlots };
      if (checked) {
        if (!updatedSlots[day]) updatedSlots[day] = {};
        if (!updatedSlots[day][value]) updatedSlots[day][value] = { patientid: [] };
      } else {
        if (updatedSlots[day] && updatedSlots[day][value]) {
          delete updatedSlots[day][value];
        }
      }
      return updatedSlots;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doctorUsername = localStorage.getItem('doctorUsername');
    try {
      const response = await axios.post(`http://localhost:5000/api/doctors/${doctorUsername}/slots`, { day, slots: slots[day] }, { withCredentials: true });
      if (response.data.success) {
        alert('Slots updated successfully');
      } else {
        alert('Error updating slots');
      }
    } catch (error) {
      console.error('Error updating slots', error);
      alert('Error updating slots');
    }
  };

  return (
    <div className="doctor-slots-container bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Select Slots for {day}</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="doctor-slots-days mb-4">
          <label className="block mb-2">Select Day:</label>
          <select value={day} onChange={(e) => setDay(e.target.value)} className="select select-bordered w-full max-w-xs">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
          </select>
        </div>
        <div className="doctor-slots-times mb-4">
          <label className="block mb-2">Select Slots:</label>
          <div className="grid grid-cols-2 gap-2">
            {['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'].map((time) => (
              <div key={time} className="flex items-center">
                <input
                  type="checkbox"
                  value={time}
                  checked={slots[day] && slots[day][time] ? true : false}
                  onChange={handleSlotChange}
                  className="checkbox checkbox-primary"
                /> 
                <span className="ml-2">{time}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <button type="submit" className="btn btn-primary mt-4">Update Slots</button>
        </div>
      </form>
    </div>
  );
}

export default DoctorSelectSlotsPage;
