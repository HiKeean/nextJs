import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Sidebar.module.css'
import Logo from './logo'

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className={styles.sidebar}>
      
      <ul className={styles.navLinks}>
        <li className={router.pathname === '/' ? styles.active : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={router.pathname === '/datafaktur' ? styles.active : ''}>
          <Link href="/datafaktur">Data Faktur</Link>
        </li>
        <li className={router.pathname === '/contact' ? styles.active : ''}>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
