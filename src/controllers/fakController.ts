// controllers/fakController.ts
export const createDataTiket = async (formValues:any) => {   
    const token = sessionStorage.getItem('token');
    // console.log(formValues.id);
    try {
        const response = await fetch('https://api.satria-wisata.com/api/faktur/createfaktur', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            "RequestParameter":{
                "nama_pemesan": formValues.nama_pemesan, 
                "no_telp": formValues.no_telp,
                "penumpang": formValues.penumpang,
                "no_maskapai": formValues.no_maskapai, 
                "kota_asal": formValues.kota_asal,
                "kota_tujuan": formValues.kota_tujuan,
                "tanggal_perjalanan": formValues.tanggal_perjalanan,
                "jam_penerbangan": formValues.jam_penerbangan,
                "user_id": formValues.id
        },
        "SecretKey" : "SAT123TIK78",
        "APPS" : "satriaweb"
        }),
        })
    
    // Periksa apakah permintaan berhasil
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response;
  } catch (error) {
    throw new Error('Login failed');
  }


};

export const createDataHotel = async (formValues:any) => {   
    const token = sessionStorage.getItem('token');
    // console.log(formValues.id);
    try {
        const response = await fetch('https://api.satria-wisata.com/api/faktur/createfaktur', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
            "RequestParameter":{
                "nama_pemesan": formValues.nama_pemesan, 
                "no_telp": formValues.no_telp,
                "penumpang": formValues.penumpang,
                "no_maskapai": formValues.no_maskapai, 
                "kota_asal": formValues.kota_asal,
                "kota_tujuan": formValues.kota_tujuan,
                "tanggal_perjalanan": formValues.tanggal_perjalanan,
                "jam_penerbangan": formValues.jam_penerbangan,
                "user_id": formValues.id
        },
        "SecretKey" : "SAT123HOT78",
        "APPS" : "satriaweb"
        }),
        })
    
    // Periksa apakah permintaan berhasil
    if (!response.ok) {
      throw new Error('Login failed');
    }
    return response;
  } catch (error) {
    throw new Error('Login failed');
  }


};