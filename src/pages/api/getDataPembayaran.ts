export const getDataPembayaran = async()=>{
    const token = sessionStorage.getItem('token');
      try {
        const response = await fetch('https://api.satria-wisata.com/api/faktur/getdatapembayaran', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error('Fetch Failed');
      }
  }
  export default getDataPembayaran;
