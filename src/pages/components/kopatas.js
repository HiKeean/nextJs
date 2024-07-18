import React, { useState, useEffect } from 'react';
import { me } from '../../controllers/authController';

const Name = () => {
  const [userName, setUserName] = useState(''); // State untuk menyimpan nama pengguna

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await me();
        setUserName(userData); // Asumsi nama pengguna ada di properti 'name'
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };
    
    fetchUserData();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const day = today.toLocaleDateString('en-US', { day: '2-digit' });
    const month = today.toLocaleDateString('en-US', { month: 'long' });
    const year = today.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };

  return (
    <div className="container d-flex justify-content-between" style={{ padding: '20px' }}>
          <p className="mb-0">Hi <strong>{userName || 'Loading...'}</strong></p>
          <p className="mb-0">{getCurrentDate()}</p>
    </div>
  )
}

export default Name