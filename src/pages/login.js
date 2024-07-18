import React from 'react';
import LoginCard from './components/loginCard';
import styles from '../styles/Login.module.css';
import getallData from './api/getDatafaktur';
import { loginUser } from '../controllers/authController';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  const afterLogin = () => {
    router.push('/');
  };

  const getData = async () => {
    try {
      await getallData();
      afterLogin();
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      afterLogin();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Incorrect Email or Password');
    }
  };

  return (
    <div className={styles.mainContainer}>
      <LoginCard onLogin={handleLogin} />
    </div>
  );
};

export default Login;
