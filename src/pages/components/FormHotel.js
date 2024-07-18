import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { me, userid } from '../../controllers/authController';
import { createData } from '../../controllers/fakController';
import { useRouter } from 'next/router';

const FormHotel = () => {
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
                tanggal_checkin: '',
                tanggal_checkout:'',
                harga_jualrn: '',
                harga_nettrn: '',
                jr: '', jn: '',
                nr: '', nn: '',
                kode_promosi: '',
                kode_unicorn: '',
                kartu_kredit: '',
            }
        ],
        no_tiket: '',
        nama_hotel: '',
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
                    tanggal_checkin: '',
                    tanggal_checkout:'',
                    harga_jualrn: '',
                    harga_nettrn: '',
                    jr: '', jn: '',
                    nr: '', nn: '',
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
                tanggal_checkin: abc.tanggal_checkin,
                tanggal_checkout: abc.tanggal_checkout,
                harga_jualrn: abc.harga_jualrn,
                harga_nettrn: abc.harga_nettrn,
                jr: abc.jr, jn: abc.jn,
                nr: abc.nr, nn: abc.nn,
                kode_promosi: abc.kode_promosi,
                kode_unicorn: abc.kode_unicorn,
                kartu_kredit: abc.kartu_kredit
            }
        } else {
            // Jika checkbox tidak dicentang, biarkan form tetap kosong
            updatedPenumpang[index] = {
                nama_penumpang: '',
                tanggal_checkin: '',
                tanggal_checkout: '',
                harga_jualrn: '',
                harga_nettrn: '',
                jr: '', jn: '',
                nr: '', nn: '',
                kode_promosi: '',
                kode_unicorn: '',
                kartu_kredit: ''
            };
        }
        setFormValues({ ...formValues, penumpang: updatedPenumpang });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await createData(formValues);
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
                        {index > 0 && (
                            <hr />
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
                            <label htmlFor={`tanggal_checkin_${index}`} className="form-label">Tanggal Checkin</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`tanggal_checkin_${index}`}
                                name={`tanggal_checkin_${index}`}
                                value={penumpang.tanggal_checkin}
                                onChange={(e) => handleChange(e, index, 'tanggal_checkin')}
                                required
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`tanggal_checkout_${index}`} className="form-label">Tanggal Checkout</label>
                            <input
                                type="date"
                                className="form-control"
                                id={`tanggal_checkout_${index}`}
                                name={`tanggal_checkout_${index}`}
                                value={penumpang.tanggal_checkout}
                                onChange={(e) => handleChange(e, index, 'tanggal_checkout')}
                                required
                            />
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`harga_jualrn_${index}`} className="form-label">Harga Jual/R/N</label>
                            <div className="d-flex">
                                <p>Rp. </p>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`harga_jualrn_${index}`}
                                    name={`harga_jualrn_${index}`}
                                    value={penumpang.harga_jualrn}
                                    onChange={(e) => handleChange(e, index, 'harga_jualrn')}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`jr_${index}`} className="form-label">JR</label>
                            <div className="d-flex">
                                <select
                                    className="custom-select"
                                    id={`jr_${index}`}
                                    value={penumpang.jr}
                                    onChange={(e) => handleChange(e, index, 'jr')}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`jn_${index}`} className="form-label">JN</label>
                            <div className="d-flex">
                                <select
                                    className="custom-select"
                                    id={`jn_${index}`}
                                    value={penumpang.jn}
                                    onChange={(e) => handleChange(e, index, 'jn')}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>

                    </div>
                    <div className="row mb-3">
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
                        <div className="col pt-3">
                            <label htmlFor={`harga_nettrn_${index}`} className="form-label">NTA/R/N</label>
                            <div className="d-flex">
                                <p>Rp. </p>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`harga_nettrn_${index}`}
                                    name={`harga_nettrn_${index}`}
                                    value={penumpang.harga_nettrn}
                                    onChange={(e) => handleChange(e, index, 'harga_nettrn')}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`nr_${index}`} className="form-label">NR</label>
                            <div className="d-flex">
                                <select
                                    className="custom-select"
                                    id={`nr_${index}`}
                                    value={penumpang.nr}
                                    onChange={(e) => handleChange(e, index, 'nr')}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                        <div className="col pt-3">
                            <label htmlFor={`nn_${index}`} className="form-label">NN</label>
                            <div className="d-flex">
                                <select
                                    className="custom-select"
                                    id={`nn_${index}`}
                                    value={penumpang.nn}
                                    onChange={(e) => handleChange(e, index, 'nn')}
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {showCheckbox && index > 0 && (
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
                <label htmlFor="no_tiket" className="form-label">Nomor Tiket Hotel</label>
                <input
                    type="text"
                    className="form-control"
                    id="no_tiket"
                    name="no_tiket"
                    value={formValues.no_tiket}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mt-3">
                <label htmlFor="nama_hotel" className="form-label">Nama Hotel</label>
                <input
                    type="text"
                    className="form-control"
                    id="nama_hotel"
                    name="nama_hotel"
                    value={formValues.nama_hotel}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="mt-3">
                <label htmlFor="kota_tujuan" className="form-label">Kota Hotel</label>
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

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default FormHotel;
