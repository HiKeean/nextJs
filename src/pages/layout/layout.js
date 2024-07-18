// layouts/MainLayout.js
// import Header from '../components/Header';
// import Footer from '../components/Footer';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';
import styles from '../../styles/Home.module.css';
import authMiddleware from '../../middleware/authMiddleware';

const MainLayout = ({ children }) => {
  return (
    <>
    <Navbar />
    <div className= {styles.container}>
      {/* <Header /> */}
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.content}>{children}</div>
      {/* <Footer /> */}
    </div>
    </>
    
  );
};

export default authMiddleware(MainLayout);
