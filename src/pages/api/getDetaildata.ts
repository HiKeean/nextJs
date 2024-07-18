const getDetailData = async(id:number) => {
    const idParse = Number(id);
    const token = sessionStorage.getItem('token');
    if (!token) {
      // Redirect user to the login page if token is not available
      window.location.href = '/login';
      return; // Stop further execution
    }
    try {
      const response = await fetch('https://api.satria-wisata.com/api/faktur/detfak', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body:JSON.stringify({
            "RequestParameter":{
                 "id" : idParse
            },
            "SecretKey" : "SAT123TIK78",
            "APPS" : "satriaweb"
         })
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const userData = await response.json();
      return userData;
    } catch (error) {
      throw new Error('Fetch Failed');
    }
  }
export default getDetailData;

