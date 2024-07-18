// components/Navbar.js
import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Logo from './logo';
import { logoutUser } from '../../controllers/authController';
import { useRouter } from 'next/router';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false); // State untuk menandai tampilan mobile
  const router = useRouter();

  useEffect(() => {
    // Set isMobile berdasarkan lebar layar saat komponen dimuat
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    handleResize(); // Panggil fungsi pertama kali untuk menginisialisasi state

    window.addEventListener('resize', handleResize); // Tambahkan event listener untuk update saat resize

    return () => {
      window.removeEventListener('resize', handleResize); // Bersihkan event listener pada unmount
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    await logoutUser();
    router.push('/login');
  };

  return (
    <div className={styles.navbar}>
      <Link href={'/'}>
        <Logo />
      </Link>
      {isMobile ? ( // Tampilkan dropdown hamburger jika tampilan mobile
        <div className={styles.dropdown}>
          <button onClick={toggleDropdown} className={styles.dropbtn}>
            ☰ {/* Hamburger icon */}
          </button>
          {isOpen && (
            <div className={styles.dropdownContent}>
              <Link href="/">Home</Link>
              <Link href="/datafaktur">Data Faktur</Link>
              <Link href="/profile">Profile</Link>
              <Link href="/login" onClick={handleLogout}>Logout</Link>
            </div>
          )}
        </div>
      ) : (
        // Tampilkan tombol Profile untuk layar yang lebih lebar
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
      )}
    </div>
  );
};

export default Navbar;
