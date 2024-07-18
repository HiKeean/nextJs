// controllers/authController.ts
const SecretKey = "SAT123SU77";
export const loginUser = async (email: string, password: string) => {    
  try {
    const response = await fetch('https://api.satria-wisata.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "RequestParameter":{
                  "email" : email,
                  "password": password
          },
          "SecretKey" : SecretKey,
          "APPS" : "satriaweb"
            
      }),
    })
    // Periksa apakah permintaan berhasil
    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Ambil data pengguna dari respons
    const userData = await response.json();
    const expiresAt = Date.now() + userData.expires_in * 1000;
    // Simpan token dan data pengguna ke dalam session storage atau cookie
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('expires_at', expiresAt.toString());

    return userData;
  } catch (error) {
    throw new Error('Login failed');
  }
};

// Fungsi untuk logout pengguna
export const logoutUser = async () => {
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('expires_at');
  } catch (error) {
    throw new Error('Logout failed');
  }
};

export const me = async() => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch('https://api.satria-wisata.com/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
      return 'NaN';
    }
    const userData = await response.json();
    return userData.name;
  } catch (error) {
    throw new Error('Login failed');
  }
}

export const userid = async() => {
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch('https://api.satria-wisata.com/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
      return 'NaN';
    }
    const userData = await response.json();
    console.log(userData);
    return userData;
  } catch (error) {
    throw new Error('Login failed');
  }
}
  