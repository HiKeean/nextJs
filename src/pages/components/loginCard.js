// components/LoginCard.js

import React, { useState } from 'react';
import styles from './LoginCard.module.css';
import Logo from './logo';

const LoginCard = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    // Panggil fungsi onLogin dan kirimkan email dan password
    onLogin(email, password);
  };

  return (
    <div className={styles.card}>
        <div className={styles.logoimg}>
            <Logo/>
        </div>  
        <div className={styles.inputContainer}>
            <label>Email:</label>
            <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={styles.input}
            />
        </div>
        <div className={styles.inputContainer}>
            <label>Password:</label>
            <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.input}
            />
        </div>
        <button className={styles.button} onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginCard;
