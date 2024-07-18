const getallData = async() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Redirect user to the login page if token is not available
      window.location.href = '/login';
      return; // Stop further execution
  }
    try {
      const response = await fetch('https://api.satria-wisata.com/api/faktur/getalldata', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      localStorage.setItem('DataFaktur', JSON.stringify(userData));
      return userData;
    } catch (error) {
      throw new Error('Fetch Failed');
    }
  }
export default getallData;

