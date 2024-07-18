import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Appointment.css';
import 'daisyui/dist/full.css'; // Import DaisyUI CSS
import Navbar from './PatientNavbar'
function Appointment() {
  const { username } = useParams();
  const [day, setDay] = useState('Monday');
  const [activeSlots, setActiveSlots] = useState({});
  const [selectedSlots, setSelectedSlots] = useState(new Set());
  const [patientSlots, setPatientSlots] = useState({});
  const [bookedDays, setBookedDays] = useState(new Set());
  const user_id = localStorage.getItem('user_id');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchPatientSlots = useCallback(async () => {
    if (!user_id) return;

    try {
      const response = await axios.get(`http://localhost:5000/api/patient/${user_id}/appointments`, { withCredentials: true });
      const slotsMap = {};
      const bookedDaysSet = new Set();

      response.data.appointments.forEach(appointment => {
        if (appointment.doctorUsername === username) {
          if (!slotsMap[appointment.day]) {
            slotsMap[appointment.day] = new Set();
          }
          slotsMap[appointment.day].add(appointment.slot);
          bookedDaysSet.add(appointment.day);
        }
      });

      setPatientSlots(slotsMap);
      setBookedDays(bookedDaysSet);
    } catch (error) {
      console.error('Error fetching patient slots', error);
    }
  }, [user_id, username]);

  useEffect(() => {
    async function fetchSlots() {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${username}/slots`, { withCredentials: true });
        console.log('Fetched slots data:', response.data); // Console log the fetched object
        setActiveSlots(response.data.slots || {});
      } catch (error) {
        console.error('Error fetching active slots', error);
      }
    }

    fetchSlots();
    fetchPatientSlots();
  }, [username, fetchPatientSlots]);

  const toggleSlot = (slot) => {
    if (bookedDays.has(day)) {
      alert('You can only book one slot per day');
      return;
    }

    setSelectedSlots((prevSlots) => {
      const newSlots = new Set(prevSlots);
      if (newSlots.has(slot)) {
        newSlots.delete(slot);
      } else {
        newSlots.add(slot);
      }
      return newSlots;
    });
  };

  const makeAppointment = async () => {
    if (!user_id) {
      alert('User not logged in');
      return;
    }

    try {
      const slots = Array.from(selectedSlots);
      if (slots.length === 0) {
        alert('No slot selected');
        return;
      }

      await axios.post('http://localhost:5000/api/patient/book-appointment', {
        doctorUsername: username,
        patientUsername: user_id,
        day,
        slot: slots[0] // Assuming single slot selection for now
      }, { withCredentials: true });

      alert('Appointment made successfully!');
      setSelectedSlots(new Set());
      fetchPatientSlots();
    } catch (error) {
      console.error('Error making appointment', error);
      alert('Failed to make appointment.');
    }
  };

  const renderSlotsTable = () => {
    const slotsForDay = activeSlots[day] || {};
    const patientForDay = patientSlots[day] || new Set();

    // Generate slots from 9AM to 6PM
    const timeSlots = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM'];
    const slots = timeSlots.map((slot) => {
      const isActive = slotsForDay[slot]?.patientid.length === 0;
      const isSelected = selectedSlots.has(slot);
      const isBooked = patientForDay.has(slot);

      const slotClasses = [
        isActive ? 'active' : '',
        isSelected ? 'selected' : '',
        isBooked ? 'booked' : ''
      ].join(' ');

      return (
        <td
          key={slot}
          className={slotClasses}
          onClick={() => !isBooked && isActive && !bookedDays.has(day) && toggleSlot(slot)}
        >
          {slot}
        </td>
      );
    });

    return (
      <tbody>
        <tr>{slots}</tr>
      </tbody>
    );
  };

  return (
    <div>
      <Navbar></Navbar>
      <div align="center">
        <div className="doctor-slots-container">
          <div className="doctor-slots-days">
            <select onChange={(e) => setDay(e.target.value)} value={day} className="select select-bordered">
            {days.map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
            </select>
          </div>
          <table className="doctor-slots-table">
          {renderSlotsTable()}
          </table>
          <button className="doctor-slots-button" onClick={makeAppointment} disabled={selectedSlots.size === 0}>Make Appointment</button>
        </div>
      </div>
    </div>
    
  );
}

export default Appointment;
