import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DoctorSlots() {
  const { username } = useParams();
  const [day, setDay] = useState('Monday');
  const [slots, setSlots] = useState([]);
  const [activeSlots, setActiveSlots] = useState(new Set());
  const patientId = 'your_patient_id'; // Replace with the actual patient ID

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await axios.get(`/doctors/${username}/slots`);
        setSlots(response.data.slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      }
    }

    fetchSlots();
  }, [username, day]);

  const handleSlotClick = (slotIndex) => {
    if (activeSlots.has(slotIndex)) {
      activeSlots.delete(slotIndex);
    } else {
      activeSlots.add(slotIndex);
    }
    setActiveSlots(new Set(activeSlots));
  };

  const handleBookAppointment = async () => {
    try {
      const response = await axios.post('/patients/appointments', {
        patientId,
        doctorUsername: username,
        day,
        slot: Array.from(activeSlots)
      });
      alert('Appointment booked successfully');
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  return (
    <div align="center">
      <h2>Available Slots for Dr. {username}</h2>
      <div className="doctor-slots-container">
        <div className="doctor-slots">
          <label htmlFor="day-select">Select Day:</label>
          <select id="day-select" value={day} onChange={(e) => setDay(e.target.value)}>
            {Object.keys(slots).map((day, index) => (
              <option key={index} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div className="time-slots">
          <table>
            <tbody>
              {slots[day] && slots[day].map((slot, index) => (
                <tr key={index}>
                  <td className={`slot ${activeSlots.has(index) ? 'active' : ''}`} onClick={() => handleSlotClick(index)}>
                    {slot}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={handleBookAppointment}>Book Appointment</button>
      </div>
    </div>
  );
}

export default DoctorSlots;
