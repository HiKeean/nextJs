import authMiddleware from '../middleware/authMiddleware';
import MainLayout from './layout/layout'
import getallData from './api/getDatafaktur'
import Name from './components/kopatas'
import BoxOrder from './components/boxorderan'
import BoxBank from './components/boxtotalbank'
import TabelFaktur from './components/tabelfaktur'
import Fakturhariini from './components/fakturhariini'
import styles from '../styles/Home.module.css'
import { useEffect } from 'react'


const Home = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });
    const day = today.toLocaleDateString('en-US', { day: '2-digit' });
    const month = today.toLocaleDateString('en-US', { month: 'long' });
    const year = today.getFullYear();
    return `${dayName}, ${day} ${month} ${year}`;
  };
  useEffect(() => {
    const getData = async () => {
      try {
          await getallData();
      } catch (error) {
          console.error('Failed to fetch user data:', error);
      }
    };
    getData();  
}, []);
  return (
      <MainLayout>
        <div className='container' style={{marginTop: '80px'}}>
          <Name />
          <div className={styles.boxContainer}>
            <div className={styles.box}>
              <BoxOrder />
            </div>
            <div className={styles.box2}>
              <BoxBank />
            </div>
          </div>
          <div className={styles.fakturcoy}>
            <Fakturhariini />
          </div>
        </div>
        
      </MainLayout>
  );
};

export default authMiddleware(Home);
