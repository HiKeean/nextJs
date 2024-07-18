// components/Navbar.js
import Link from 'next/link';
import { useState } from 'react'; // Import useState hook if using functional components
import styles from './Navbar.module.css';
import Logo from './logo';
import { logoutUser  } from '../../controllers/authController';
import { useRouter } from 'next/router';



const Navbardropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility
  const router = useRouter();
  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () =>{
    await logoutUser();
  } 
  return (
    <div className={styles.navbar}>
      <Link href={'/'}>
        <Logo />
      </Link>
      <div className={styles.dropdown}>
        <button onClick={toggleDropdown} className={styles.dropbtn}>
          Profile
        </button>
        {/* Conditional rendering for dropdown content */}
        {isOpen && (
          <div className={styles.dropdownContent}>
            <Link href="#">Profile</Link>
            <Link href="/login" onClick={handleLogout}>Logout</Link>

          </div>
        )}
      </div>
    </div>
  );
};

export default Navbardropdown;
