// middleware/authMiddleware.js

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const authMiddleware = (WrappedComponent) => {
  const Auth = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem('token');
      const expiresAt = sessionStorage.getItem('expires_at');

      // Cek apakah token ada dan belum kedaluwarsa
      if (!token || !expiresAt || Date.now() > parseInt(expiresAt)) {
        router.push('/login'); // Arahkan kembali ke halaman login jika token tidak ada atau kedaluwarsa
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default authMiddleware;
