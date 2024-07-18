import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { me, userid } from '../../controllers/authController';
import { createDataTiket } from '../../controllers/fakController';
import { useRouter } from 'next/router';


const FormTiket = () => {
    var ID;
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const userData = await userid();
            ID = userData.id;
            setFormValues(prevValues => ({ ...prevValues, id: ID }));
          } catch (error) {
            console.error('Failed to fetch user data:', error);
          }
        };
        
        fetchUserData();
      }, []);
    
    const [formValues, setFormValues] = useState({
        nama_pemesan: '',
        no_telp: '',
        penumpang: [
            {
                nama_penumpang: '',
                no_tiket: '',
                kode_booking: '',
                harga_jual: '',
                harga_nett: '',
                unicorn: '',
                kode_promosi: '',
                kode_unicorn: '',
                kartu_kredit: ''
            }
        ],
        no_maskapai: '',
        kota_asal: '',
        kota_tujuan: '',
        tanggal_perjalanan: '',
        jam_penerbangan: '',
        id: ID
    });

    const [showCheckbox, setShowCheckbox] = useState(false);
    const handleChange = (e, index, field) => {
        if (index !== undefined) {
            const updatedPenumpang = [...formValues.penumpang];
            updatedPenumpang[index][field] = e.target.value;
            setFormValues({ ...formValues, penumpang: updatedPenumpang });
        } else {
            setFormValues({ ...formValues, [e.target.name]: e.target.value });
        }
    };

    const handleAddPenumpang = () => {
        setFormValues({
            ...formValues,
            penumpang: [
                ...formValues.penumpang,
                {
                    nama_penumpang: '',
                    no_tiket: '',
                    kode_booking: '',
                    harga_jual: '',
                    harga_nett: '',
                    unicorn: '',
                    kode_promosi: '',
                    kode_unicorn: '',
                    kartu_kredit: ''
                }
            ]
        });
        setShowCheckbox(true);
    };

    const handleRemovePenumpang = (index) => {
        const updatedPenumpang = formValues.penumpang.filter((_, i) => i !== index);
        setFormValues({ ...formValues, penumpang: updatedPenumpang });
    };

    const handleCheckboxChange = (e, index) => {
        const updatedPenumpang = [...formValues.penumpang];
        // Jika checkbox dicentang, salin nilai dari form sebelumnya
        if (e.target.checked) {
            const abc = { ...formValues.penumpang[index - 1] };
            updatedPenumpang[index] = {
                nama_penumpang: '',
                no_tiket: '',
                kode_booking: '',
                harga_jual: abc.harga_jual,
                harga_nett: abc.harga_nett,
                unicorn: abc.unicorn,
                kode_promosi: abc.kode_promosi,
                kode_unicorn: abc.kode_unicorn,
                kartu_kredit: abc.kartu_kredit
            }
        } else {
            // Jika checkbox tidak dicentang, biarkan form tetap kosong
            updatedPenumpang[index] = {
                nama_penumpang: '',
                no_tiket: '',
                kode_booking: '',
                harga_jual: '',
                harga_nett: '',
                unicorn: '',
                kode_promosi: '',
                kode_unicorn: '',
                kartu_kredit: ''
            };
        }
        setFormValues({ ...formValues, penumpang: updatedPenumpang });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        // setFormValues(formValues.id, ID);
        try {
            const response = await createDataTiket(formValues);
            router.push('/');
          } catch (error) {
            console.error('Login failed:', error);
            // Tangani kesalahan, seperti menampilkan pesan kesalahan kepada pengguna
          }
        // Kirim formValues ke API Anda di sini
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mt-3">
                <label htmlFor="nama_pemesan" className="form-label">Nama Pemesan</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="nama_pemesan" 
                    name="nama_pemesan" 
                    value={formValues.nama_pemesan}
                    onChange={handleChange}
                    required 
                />
            </div>

            <div className="mt-3 mb-3">
                <label htmlFor="no_telp" className="form-label">No Telp</label>
                <input 
                    type="number" 
                    className="form-control" 
                    id="no_telp" 
                    name="no_telp" 
                    value={formValues.no_telp}
                    onChange={handleChange}
                    required 
                    min="1000000000"
                />
            </div>

            {formValues.penumpang.map((penumpang, index) => (
                <div className="form-row mb-3" key={index}>
                    <div className="row mb-3">
                        {index > 0 &&(
                            <hr/>
                        )}
                        <div className="col pt-3">
                            <label htmlFor={`nama_penumpang_${index}`} className="form-label">Nama Penumpang</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`nama_penumpang_${index}`} 
                                name={`nama_penumpang_${index}`}
                                value={penumpang.nama_penumpang}
                                onChange={(e) => handleChange(e, index, 'nama_penumpang')}
                                required 
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`nomor_tiket_${index}`} className="form-label">Nomor Tiket</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`nomor_tiket_${index}`} 
                                name={`no_tiket_${index}`}
                                value={penumpang.no_tiket}
                                onChange={(e) => handleChange(e, index, 'no_tiket')}
                                required 
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`kode_booking_${index}`} className="form-label">Kode Booking</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`kode_booking_${index}`} 
                                name={`kode_booking_${index}`}
                                value={penumpang.kode_booking}
                                onChange={(e) => handleChange(e, index, 'kode_booking')}
                                required 
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`harga_jual_${index}`} className="form-label">Harga Jual</label>
                            <div className="d-flex">
                                <p>Rp. </p>
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    id={`harga_jual_${index}`} 
                                    name={`harga_jual_${index}`}
                                    value={penumpang.harga_jual}
                                    onChange={(e) => handleChange(e, index, 'harga_jual')}
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`harga_nett_${index}`} className="form-label">NTA</label>
                            <div className="d-flex">
                                <p>Rp. </p>
                                <input 
                                    type="number" 
                                    className="form-control"  
                                    id={`harga_nett_${index}`} 
                                    name={`harga_nett_${index}`}
                                    value={penumpang.harga_nett}
                                    onChange={(e) => handleChange(e, index, 'harga_nett')}
                                    required 
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col pt-3">
                            <label htmlFor={`unicorn_${index}`} className="form-label">Unicorn</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`unicorn_${index}`} 
                                name={`unicorn_${index}`}
                                value={penumpang.unicorn}
                                onChange={(e) => handleChange(e, index, 'unicorn')}
                                required 
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`kode_promosi_${index}`} className="form-label">Kode Promosi</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`kode_promosi_${index}`} 
                                name={`kode_promosi_${index}`}
                                value={penumpang.kode_promosi}
                                onChange={(e) => handleChange(e, index, 'kode_promosi')}
                                required 
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`kode_unicorn_${index}`} className="form-label">Kode Unicorn</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`kode_unicorn_${index}`} 
                                name={`kode_unicorn_${index}`}
                                value={penumpang.kode_unicorn}
                                onChange={(e) => handleChange(e, index, 'kode_unicorn')}
                                required 
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`kartu_kredit_${index}`} className="form-label">Kartu Kredit</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id={`kartu_kredit_${index}`} 
                                name={`kartu_kredit_${index}`}
                                value={penumpang.kartu_kredit}
                                onChange={(e) => handleChange(e, index, 'kartu_kredit')}
                                required 
                            />
                        </div>
                    </div>
                    {showCheckbox && index > 0 &&(
                        <div className="form-check mt-3 mb-3">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id={`checkbox_${index}`}
                                onChange={(e) => handleCheckboxChange(e, index)}
                            />
                            <label className="form-check-label" htmlFor={`checkbox_${index}`}>
                                <strong>Copy</strong>
                            </label>
                        </div>
                    )}
                    {index > 0 && (
                        <button type="button" onClick={() => handleRemovePenumpang(index)} className="btn btn-danger">-</button>
                    )}
                    
                </div>
            ))}
            {formValues.penumpang.length < 6 && (
                <button type="button" onClick={handleAddPenumpang} className="btn btn-success">+</button>
            )}

            <div className="mt-3">
                <label htmlFor="no_maskapai" className="form-label">Nomor Maskapai</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="no_maskapai" 
                    name="no_maskapai" 
                    value={formValues.no_maskapai}
                    onChange={handleChange}
                    required 
                />
            </div>

            <div className="mt-3">
                <label htmlFor="kota_asal" className="form-label">Kota Asal</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="kota_asal" 
                    name="kota_asal" 
                    value={formValues.kota_asal}
                    onChange={handleChange}
                    required 
                />
            </div>

            <div className="mt-3">
                <label htmlFor="kota_tujuan" className="form-label">Kota Tujuan</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="kota_tujuan" 
                    name="kota_tujuan" 
                    value={formValues.kota_tujuan}
                    onChange={handleChange}
                    required 
                />
            </div>

            <div className="mt-3">
                <label htmlFor="tanggal_perjalanan" className="form-label">Tanggal Perjalanan</label>
                <input 
                    type="date"  
                    className="form-control" 
                    id="tanggal_perjalanan" 
                    name="tanggal_perjalanan" 
                    value={formValues.tanggal_perjalanan}
                    onChange={handleChange}
                    required 
                />
            </div>

            <div className="mt-3 mb-3">
                <label htmlFor="jam_penerbangan" className="form-label">Jam Penerbangan</label>
                <input 
                    type="time" 
                    className="form-control" 
                    id="jam_penerbangan" 
                    name="jam_penerbangan" 
                    value={formValues.jam_penerbangan}
                    onChange={handleChange}
                    required 
                />
            </div>


            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default FormTiket;
